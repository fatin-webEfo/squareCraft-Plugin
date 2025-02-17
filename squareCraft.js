(async function squareCraft() {
  const widgetScript = document.getElementById("squarecraft-script");
  if (!widgetScript) {
    console.error("❌ Widget script not found! Ensure the script tag exists with id 'squarecraft-script'.");
    return;
  }

  // Add your CSS link
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.type = "text/css";
  link.href = "https://fatin-webefo.github.io/squareCraft-Plugin/src/styles/parent.css";
  document.head.appendChild(link);

  const token = widgetScript?.dataset?.token || localStorage.getItem("squareCraft_auth_token");
  const userId = widgetScript.dataset?.uId || localStorage.getItem("squareCraft_u_id");
  const widgetId = widgetScript.dataset?.wId || localStorage.getItem("squareCraft_w_id");

  const fontSizes = [8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 34, 36, 38, 40, 42, 44, 46, 48, 50];
  let fontSizeOptions = '';
  for (let size of fontSizes) {
    fontSizeOptions += `<option value="${size}">${size}px</option>`;
  }

  let selectedElement = null;
  let appliedStyles = new Set();

  // Get the page ID from the DOM
  function getPageId() {
    let pageElement = document.querySelector("article[data-page-sections]");
    return pageElement ? pageElement.getAttribute("data-page-sections") : null;
  }

  // Apply CSS to a selected element dynamically
  function applyStylesToElement(elementId, css) {
    if (!elementId || !css || appliedStyles.has(elementId)) return;

    let styleTag = document.getElementById(`style-${elementId}`);
    if (!styleTag) {
      styleTag = document.createElement("style");
      styleTag.id = `style-${elementId}`;
      document.head.appendChild(styleTag);
    }

    let cssText = `#${elementId} { `;
    Object.keys(css).forEach(prop => {
      cssText += `${prop}: ${css[prop]} !important; `;
    });
    cssText += "}";

    styleTag.innerHTML = cssText;
    appliedStyles.add(elementId);
  }

  // Fetch saved modifications for the page and apply them
  async function fetchModifications() {
    let pageId = getPageId();
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

      data.modifications.forEach(({ pageId: storedPageId, elements }) => {
        if (storedPageId === pageId) {
          elements.forEach(({ elementId, css }) => {
            applyStylesToElement(elementId, css);
          });
        }
      });

    } catch (error) {
      console.error("❌ Error fetching modifications:", error);
    }
  }

  // Save modifications to the backend
  async function saveModifications(elementId, css) {
    let pageId = getPageId();
    if (!pageId || !elementId || !css) {
      console.warn("⚠️ Missing required data to save modifications.");
      return;
    }

    applyStylesToElement(elementId, css); // Apply changes immediately on the page
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

  // Create the widget UI for font size selection
  function createWidget() {
    const widgetContainer = document.createElement("div");
    widgetContainer.id = "squarecraft-widget-container";
    widgetContainer.style.position = "fixed";
    widgetContainer.style.top = "100px";
    widgetContainer.style.left = "100px";
    widgetContainer.style.zIndex = "9999";

    widgetContainer.innerHTML = `
        <div class="squareCraft-p-4 squareCraft-border squareCraft-border-solid squareCraft-border-3d3d3d squareCraft-bg-color-2c2c2c squareCraft-rounded-15px squareCraft-w-300px">
          <select id="fontSizeDropdown" class="squareCraft-text-sm squareCraft-font-light squareCraft-bg-494949 squareCraft-text-white">
            ${fontSizeOptions}
          </select>
        </div>
      `;
    document.body.appendChild(widgetContainer);

    // Handle font size selection change
    document.body.addEventListener("change", async (event) => {
      if (event.target.id === "fontSizeDropdown") {
        const fontSize = event.target.value;

        if (!selectedElement) return;

        let css = {
          "font-size": fontSize + "px",
        };

        applyStylesToElement(selectedElement.id, css); // Apply real-time changes
        await saveModifications(selectedElement.id, css); // Save changes to the backend
      }
    });
  }

  // Attach event listeners for element selection and modification
  function attachEventListeners() {
    document.body.addEventListener("click", (event) => {
      let block = event.target.closest('[id^="block-"]');
      if (!block) return;

      if (selectedElement) selectedElement.style.outline = "";
      selectedElement = block;
      selectedElement.style.outline = "2px dashed #EF7C2F"; // Show border to indicate selected element

      console.log(`✅ Selected Element: ${selectedElement.id}`);
    });
  }

  // Initialize everything after DOM content is loaded
  document.addEventListener("DOMContentLoaded", () => {
    createWidget();
    attachEventListeners();
    fetchModifications(); // Fetch modifications when the page is loaded
  });
})();
