(async function squareCraft() {
  const widgetScript = document.getElementById("squarecraft-script");
  if (!widgetScript) {
    console.error("❌ Widget script not found! Ensure the script tag exists with id 'squarecraft-script'.");
    return;
  }

  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.type = "text/css";
  link.href = "https://fatin-webefo.github.io/squareCraft-Plugin/src/styles/parent.css";
  document.head.appendChild(link);

  const token = widgetScript?.dataset?.token || localStorage.getItem("squareCraft_auth_token");
  const userId = widgetScript.dataset?.uId || localStorage.getItem("squareCraft_u_id");
  const widgetId = widgetScript.dataset?.wId || localStorage.getItem("squareCraft_w_id");
  console.log(" widgetId: " + widgetId, "token: " + token, "userId: " + userId);

  let selectedElement = null;
  let appliedStyles = new Set(); // Track applied styles to prevent duplicate injection

  function getPageId() {
    let pageElement = document.querySelector("article[data-page-sections]");
    return pageElement ? pageElement.getAttribute("data-page-sections") : null;
  }

  let pageId = getPageId();
  if (!pageId) console.warn("⚠️ No page ID found. Plugin may not work correctly.");

  function applyStylesToElement(elementId, css) {
    if (!elementId || !css) return;

    // Remove previous style tag if it exists
    let styleTag = document.getElementById(`style-${elementId}`);
    if (styleTag) {
      styleTag.remove(); // Remove the old styles before adding new ones
    }

    // Create new style tag to apply updated styles
    styleTag = document.createElement("style");
    styleTag.id = `style-${elementId}`;
    document.head.appendChild(styleTag);

    let cssText = `#${elementId} { `;
    Object.keys(css).forEach(prop => {
      cssText += `${prop}: ${css[prop]} !important; `;
    });
    cssText += "}";

    styleTag.innerHTML = cssText;
    appliedStyles.add(elementId);
    console.log(`✅ Styles Applied for ${elementId}: ${cssText}`);
  }

  async function fetchModifications(retries = 3) {
    if (!pageId) return;

    try {
      console.log(`📄 Fetching saved modifications for Page ID: ${pageId}`);

      const response = await fetch(
        `https://webefo-backend.vercel.app/api/v1/get-modifications?userId=${userId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token || localStorage.getItem("squareCraft_auth_token")}`,
          },
        }
      );

      const data = await response.json();
      console.log("📥 Get method response:", data);

      if (!data.modifications || data.modifications.length === 0) {
        console.warn("⚠️ No styles found for this page.");
        return;
      }

      // Apply styles dynamically for each element stored
      data.modifications.forEach(({ pageId: storedPageId, elements }) => {
        if (storedPageId === pageId) {
          elements.forEach(({ elementId, css }) => {
            applyStylesToElement(elementId, css);
          });
        }
      });

    } catch (error) {
      console.error("❌ Error fetching modifications:", error);
      if (retries > 0) {
        console.log(`🔄 Retrying fetch... (${retries} left)`);
        setTimeout(() => fetchModifications(retries - 1), 2000);
      }
    }
  }

  async function saveModifications(elementId, css) {
    if (!pageId || !elementId || !css) {
      console.warn("⚠️ Missing required data to save modifications.");
      return;
    }

    // Apply styles instantly
    applyStylesToElement(elementId, css);

    console.log("📡 Saving modifications for:", { pageId, elementId, css });

    const modificationData = {
      userId,
      token,
      widgetId,
      modifications: [{ pageId, elements: [{ elementId, css }] }],
    };

    try {
      const response = await fetch("https://webefo-backend.vercel.app/api/v1/modifications", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token || localStorage.getItem("squareCraft_auth_token")}`,
          "userId": userId,
          "pageId": pageId,
          "widget-id": widgetId,
        },
        body: JSON.stringify(modificationData),
      });

      console.log("✅ Changes Saved Successfully!", await response.json());
    } catch (error) {
      console.error("❌ Error saving modifications:", error);
    }
  }

  function createWidget() {
    const widgetContainer = document.createElement("div");
    widgetContainer.id = "squarecraft-widget-container";
    widgetContainer.style.position = "fixed";
    widgetContainer.style.top = "100px";
    widgetContainer.style.left = "100px";
    widgetContainer.style.zIndex = "9999";

    widgetContainer.innerHTML = `
      <div class="squareCraft-widget-container squareCraft-bg-color-2c2c2c">
        <h3 class="squareCraft-widget-title">🎨 SquareCraft Widget</h3>

        <label class="squareCraft-label" for="squareCraftFontSize">Font Size:</label>
        <input type="number" id="squareCraftFontSize" class="squareCraft-input" value="16" min="10" max="50">

        <label class="squareCraft-label" for="squareCraftBgColor">Background Color:</label>
        <input type="color" id="squareCraftBgColor" class="squareCraft-input" value="#ffffff">

        <label class="squareCraft-label" for="squareCraftBorderRadius">Border Radius:</label>
        <input type="range" id="squareCraftBorderRadius" class="squareCraft-input" min="0" max="50" value="0">
        
        <p class="squareCraft-text">Border Radius: <span id="borderRadiusValue">0px</span></p>
      </div>
    `;
    document.body.appendChild(widgetContainer);
  }

  function attachEventListeners() {
    document.body.addEventListener("click", (event) => {
      let block = event.target.closest('[id^="block-"]');
      if (!block) return;

      if (selectedElement) selectedElement.style.outline = "";
      selectedElement = block;
      selectedElement.style.outline = "2px dashed #EF7C2F"; // Show border to indicate selected element

      console.log(`✅ Selected Element: ${selectedElement.id}`);
    });

    document.body.addEventListener("input", async (event) => {
      if (!selectedElement) return;

      let css = {};
      if (event.target.id === "squareCraftFontSize") {
        css["font-size"] = event.target.value + "px";
      } else if (event.target.id === "squareCraftBgColor") {
        css["background-color"] = event.target.value;
      } else if (event.target.id === "squareCraftBorderRadius") {
        css["border-radius"] = event.target.value + "px";
      }

      if (Object.keys(css).length > 0) {
        applyStylesToElement(selectedElement.id, css);  // Apply styles instantly
        await saveModifications(selectedElement.id, css);  // Save to the backend for persistence
      }
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    createWidget();
    attachEventListeners();
    fetchModifications(); // Fetch modifications when the page is loaded
  });
})();
