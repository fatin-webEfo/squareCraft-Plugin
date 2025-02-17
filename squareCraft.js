(async function squareCraft() {
  const widgetScript = document.getElementById("squarecraft-script");
  if (!widgetScript) {
    console.error(":x: Widget script not found! Ensure the script tag exists with id 'squarecraft-script'.");
    return;
  }

  const token = widgetScript?.dataset?.token || localStorage.getItem("squareCraft_auth_token");
  const userId = widgetScript.dataset?.uId || localStorage.getItem("squareCraft_u_id");
  const widgetId = widgetScript.dataset?.wId || localStorage.getItem("squareCraft_w_id");

  if (token) localStorage.setItem("squareCraft_auth_token", token);
  if (userId) localStorage.setItem("squareCraft_u_id", userId);
  if (widgetId) localStorage.setItem("squareCraft_w_id", widgetId);

  let selectedElement = null;
  let appliedStyles = new Set();

  function getPageId() {
    let pageElement = document.querySelector("article[data-page-sections]");
    return pageElement ? pageElement.getAttribute("data-page-sections") : null;
  }

  let pageId = getPageId();
  if (!pageId) console.warn(":warning: No page ID found. Plugin may not work correctly.");

  // Function to apply styles dynamically to the element
  function applyStylesToElement(elementId, css) {
    if (!elementId || !css) return;

    let styleTag = document.getElementById(`style-${elementId}`);
    if (styleTag) {
      styleTag.remove();  // Remove the old styles before adding new ones
    }

    styleTag = document.createElement("style");
    styleTag.id = `style-${elementId}`;
    document.head.appendChild(styleTag);

    let cssText = `#${elementId}, #${elementId} * { `;
    Object.keys(css).forEach(prop => {
      cssText += `${prop}: ${css[prop]} !important; `;
    });
    cssText += "}";

    if (css["border-radius"]) {
      cssText += `#${elementId} { overflow: hidden !important; }`;
    }

    styleTag.innerHTML = cssText;
    appliedStyles.add(elementId);
    console.log(`:white_check_mark: Styles Persisted for ${elementId}`);
  }

  // Fetch saved modifications (including font sizes) from the backend
  async function fetchModifications(retries = 3) {
    if (!pageId) return;

    try {
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

      if (!data.modifications || data.modifications.length === 0) {
        console.warn(":warning: No styles found for this page.");
        return;
      }

      console.log(":inbox_tray: Applying stored modifications...", data);
      data.modifications.forEach(({ pageId: storedPageId, elements }) => {
        if (storedPageId === pageId) {
          elements.forEach(({ elementId, css }) => {
            applyStylesToElement(elementId, css);
          });
        }
      });

    } catch (error) {
      console.error(":x: Error fetching modifications:", error);
      if (retries > 0) {
        console.log(`:arrows_counterclockwise: Retrying fetch... (${retries} left)`);
        setTimeout(() => fetchModifications(retries - 1), 2000);
      }
    }
  }

  async function saveModifications(elementId, css) {
    if (!pageId || !elementId || !css) {
      console.warn(":warning: Missing required data to save modifications.");
      return;
    }

    applyStylesToElement(elementId, css);
    console.log(":satellite_antenna: Saving modifications for:", { pageId, elementId, css });

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

      console.log(":white_check_mark: Changes Saved Successfully!", await response.json());
    } catch (error) {
      console.error(":x: Error saving modifications:", error);
    }
  }

  // Create Widget HTML dynamicallyart
  function createWidget() {
    const widgetContainer = document.createElement("div");
    widgetContainer.id = "squarecraft-widget-container";
    widgetContainer.style.position = "fixed";
    widgetContainer.style.top = "100px";
    widgetContainer.style.left = "100px";
    widgetContainer.style.zIndex = "9999";

    widgetContainer.innerHTML = `
      <div style="width: 300px; background: #2C2C2C; padding: 20px; border-radius: 18px; color: white;">
        <h2>SquareCraft Widget</h2>
        <label>Font Size:</label>
        <input type="number" id="squareCraftFontSize" value="16" min="10" max="50" style="width: 100%;">
        <label>Background Color:</label>
        <input type="color" id="squareCraftBgColor" value="#FFFFFF" style="width: 100%;">
        <label>Border Radius:</label>
        <input type="range" id="squareCraftBorderRadius" min="0" max="50" value="0">
        <p>Border Radius: <span id="borderRadiusValue">0px</span></p>
      </div>
    `;
    document.body.appendChild(widgetContainer);
  }

  // Event listeners for dynamic font size and background color changes
  function attachEventListeners() {
    document.body.addEventListener("click", (event) => {
      let block = event.target.closest('[id^="block-"]');
      if (!block) return;

      if (selectedElement) selectedElement.style.outline = "";
      selectedElement = block;
      selectedElement.style.outline = "2px dashed #EF7C2F";
      console.log(`:white_check_mark: Selected Element: ${selectedElement.id}`);
    });

    // Listen for input changes and update styles in real-time
    document.body.addEventListener("input", async (event) => {
      if (!selectedElement) return;
    
      let css = {};
      if (event.target.id === "squareCraftFontSize") {
        css["font-size"] = event.target.value + "px";  // This applies the font size instantly
      } else if (event.target.id === "squareCraftBgColor") {
        css["background-color"] = event.target.value;
      } else if (event.target.id === "squareCraftBorderRadius") {
        css["border-radius"] = event.target.value + "px";
      }
    
      if (Object.keys(css).length > 0) {
        applyStylesToElement(selectedElement.id, css);  // Apply styles instantly to the selected element
        await saveModifications(selectedElement.id, css);  // Save the styles in the backend
      }
    });
    
  }

  document.addEventListener("DOMContentLoaded", () => {
    createWidget();
    attachEventListeners();
    fetchModifications();  // Fetch and apply saved modifications immediately
  });
})();
