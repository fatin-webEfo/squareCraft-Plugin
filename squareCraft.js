(async function squareCraft() {
  const widgetScript = document.getElementById("squarecraft-script");
  if (!widgetScript) {
    console.error("❌ Widget script not found! Ensure the script tag exists with id 'squarecraft-script'.");
    return;
  }

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

  function getPageId() {
    let pageElement = document.querySelector("article[data-page-sections]");
    return pageElement ? pageElement.getAttribute("data-page-sections") : null;
  }

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

  async function saveModifications(elementId, css) {
    const modificationData = {
      userId,
      token,
      widgetId,
      modifications: [{ pageId: getPageId(), elements: [{ elementId, css }] }],
    };

    try {
      const response = await fetch("https://webefo-backend.vercel.app/api/v1/modifications", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token || localStorage.getItem("squareCraft_auth_token")}`,
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
        <div class="squareCraft-p-4 squareCraft-border squareCraft-border-solid squareCraft-border-3d3d3d squareCraft-bg-color-2c2c2c squareCraft-rounded-15px squareCraft-w-300px">
          <select id="fontSizeDropdown" class="squareCraft-text-sm squareCraft-font-light squareCraft-bg-494949 squareCraft-text-white">
            ${fontSizeOptions}
          </select>
        </div>
      `;
    document.body.appendChild(widgetContainer);

    document.body.addEventListener("change", async (event) => {
      if (event.target.id === "fontSizeDropdown") {
        const fontSize = event.target.value;

        if (!selectedElement) return;

        let css = {
          "font-size": fontSize + "px",
        };

        applyStylesToElement(selectedElement.id, css); // Apply styles in real-time
        await saveModifications(selectedElement.id, css); // Save styles
      }
    });
  }

  function attachEventListeners() {
    document.body.addEventListener("click", (event) => {
      let block = event.target.closest('[id^="block-"]');
      if (!block) return;

      if (selectedElement) selectedElement.style.outline = "";
      selectedElement = block;
      selectedElement.style.outline = "2px dashed #EF7C2F"; // Show the border to indicate selection

      console.log(`✅ Selected Element: ${selectedElement.id}`);
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    createWidget();
    attachEventListeners();
  });
})();
