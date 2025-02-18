(async function squareCraft() {
  const widgetScript = document.getElementById("squarecraft-script");
  if (!widgetScript) {
    console.error(":x: Widget script not found! Ensure the script tag exists with id 'squarecraft-script'.");
    return;
  }

  const token = widgetScript.dataset?.token;
  const squareCraft_u_id = widgetScript.dataset?.uId; 
  const squareCraft_w_id = widgetScript.dataset?.wId; 
  const userId = localStorage.getItem("squareCraft_u_id");
  const widgetId = localStorage.getItem("squareCraft_w_id");
  
  if (token) {
      console.log("🔑 Token received:", token);
      localStorage.setItem("squareCraft_auth_token", token);
      document.cookie = `squareCraft_auth_token=${token}; path=.squarespace.com;`;
  }

  if (squareCraft_u_id) {
      console.log("👤 User ID received:", squareCraft_u_id);
      localStorage.setItem("squareCraft_u_id", squareCraft_u_id);
      document.cookie = `squareCraft_u_id=${squareCraft_u_id}; path=.squarespace.com;`;

  }

  if (squareCraft_w_id) {
      console.log("🛠️ Widget ID received:", squareCraft_w_id);
      localStorage.setItem("squareCraft_w_id", squareCraft_w_id);
      document.cookie = `squareCraft_w_id=${squareCraft_w_id}; path=.squarespace.com;`;
  }
  
  const link = document.createElement("link");
  link.rel = "stylesheet";  
  link.type = "text/css";
  link.href = "https://fatin-webefo.github.io/squareCraft-Plugin/src/styles/parent.css";
  document.head.appendChild(link);

  const fontSizes = [8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 34, 36, 38, 40, 42, 44, 46, 48, 50];
  let fontSizeOptions = '';
  for (let size of fontSizes) {
    fontSizeOptions += `<option value="${size}">${size}px</option>`;
  }


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
console.log(fontSizes.map(sizes => sizes));
  // Create Widget HTML dynamicallyart
  function createWidget() {
    const widgetContainer = document.createElement("div");
    widgetContainer.id = "squarecraft-widget-container";
    widgetContainer.style.position = "fixed";
    widgetContainer.style.top = "100px";
    widgetContainer.style.left = "100px";
    widgetContainer.style.zIndex = "9999";

    widgetContainer.innerHTML = `
     <div
class="squareCraft-p-4 squareCraft-border squareCraft-border-solid squareCraft-border-3d3d3d squareCraft-bg-color-2c2c2c squareCraft-rounded-15px squareCraft-w-300px">
<div class="squareCraft-flex squareCraft-items-center squareCraft-justify-between">
    <img src="https://i.ibb.co.com/pry1mVGD/Group-28-1.png" width="140px" />
    <div
        class="squareCraft-flex squareCraft-items-center squareCraft-py-1px squareCraft-rounded-15px squareCraft-gap-2 squareCraft-bg-color-3d3d3d squareCraft-px-2">
        <p class="squareCraft-text-sm">Auto Save</p>
        <img src="https://i.ibb.co.com/B2NjHwSq/redo-rectangle.png" width="16px" />
    </div>


</div>
<p class="squareCraft-text-sm squareCraft-mt-6 squareCraft-font-light">Lorem Ipsum is simply dummy text
    of the printing and typesetting industry.</p>
<div
    class="squareCraft-mt-6  squareCraft-border-t squareCraft-border-dashed squareCraft-border-color-494949  squareCraft-w-full">
</div>

<div class="squareCraft-mt-6 squareCraft-flex  squareCraft-items-center ">
    <p class="squareCraft-text-sm squareCraft-px-4 squareCraft-cursor-pointer tabHeader ">Design</p>
    <p class="squareCraft-text-sm squareCraft-px-4 squareCraft-cursor-pointer tabHeader">Advanced</p>
    <p class="squareCraft-text-sm squareCraft-px-4 squareCraft-cursor-pointer tabHeader">Presets</p>
</div>

<div
    class="squareCraft-border-t squareCraft-border-solid squareCraft-relative squareCraft-border-color-494949 squareCraft-w-full squareCraft-mt-2">
    <div
        class="squareCraft-absolute squareCraft-top-0 squareCraft-left-0 squareCraft-bg-colo-EF7C2F squareCraft-w-16 squareCraft-h-1px">
    </div>
</div>

<div
    class="squareCraft-rounded-6px squareCraft-mt-6  squareCraft-border squareCraft-border-solid squareCraft-border-EF7C2F squareCraft-bg-color-3d3d3d">
    <div class="squareCraft-flex squareCraft-p-2 squareCraft-items-center squareCraft-justify-between">
        <div class="squareCraft-flex squareCraft-gap-2 squareCraft-items-center"><img loading="lazy"
                src="https://fatin-webefo.github.io/squareCraft-Plugin/public/T.svg" alt="">
            <p>Typography</p>
        </div>
        <img src="https://fatin-webefo.github.io/squareCraft-Plugin/public/arrow.svg" alt="">
    </div>
    <div class="squareCraft-h-1px squareCraft-bg-3f3f3f"></div>
    <div
        class="squareCraft-flex squareCraft-px-2 squareCraft-mt-2 squareCraft-items-center squareCraft-justify-between">
        <div class="squareCraft-flex squareCraft-gap-2 squareCraft-items-center">
            <div class="toggle-container" id="toggleSwitch">
                <div class="toggle-bullet"></div>
            </div>
            <p id="toggleText" class="squareCraft-text-sm">Enable</p>
        </div>
        <div id="resetButton" 
        class="squareCraft-flex squareCraft-cursor-pointer squareCraft-items-center squareCraft-py-1px squareCraft-rounded-15px squareCraft-gap-2 squareCraft-bg-3f3f3f squareCraft-px-2">
        <p class="squareCraft-text-sm">Reset</p>
        <img id="resetIcon" 
            src="https://fatin-webefo.github.io/squareCraft-Plugin/public/reset.svg"
            width="12px" />
    </div>
    
    </div>
    <div class="squareCraft-h-1px squareCraft-mt-2 squareCraft-bg-3f3f3f"></div>
    <div class="squareCraft-mt-2">
        <div
            class="squareCraft-flex squareCraft-px-2 squareCraft-w-full squareCraft-items-center squareCraft-justify-between squareCraft-gap-2">
            <div
                class="squareCraft-cursor-pointer squareCraft-bg-color-EF7C2F squareCraft-w-full squareCraft-font-light squareCraft-flex squareCraft-items-center squareCraft-text-sm squareCraft-py-1px squareCraft-rounded-6px squareCraft-text-color-white squareCraft-justify-center">
                Normal</div>
            <div
                class="squareCraft-cursor-pointer squareCraft-bg-3f3f3f squareCraft-w-full squareCraft-text-color-white squareCraft-font-light squareCraft-flex squareCraft-text-sm squareCraft-py-1px squareCraft-rounded-6px squareCraft-items-center squareCraft-justify-center">
                Hover</div>
        </div>
        <div class="squareCraft-px-4">
            <div class="squareCraft-h-1px  squareCraft-mt-2 squareCraft-bg-3f3f3f"></div>
        </div>
    </div>

    <div class="squareCraft-mt-6 squareCraft-px-2 squareCraft-flex squareCraft-justify-between">
        <p class="squareCraft-text-sm">Text</p>
        <img src="https://fatin-webefo.github.io/squareCraft-Plugin/public/eye.svg" width="12px" />
    </div>

    <div class="squareCraft-mt-2 squareCraft-grid squareCraft-w-full squareCraft-grid-cols-12 squareCraft-gap-2 squareCraft-px-2">
        <div id="squareCraft-font-family" class="squareCraft-flex squareCraft-col-span-8 squareCraft-cursor-pointer squareCraft-justify-between squareCraft-border squareCraft-border-solid squareCraft-border-585858 squareCraft-rounded-6px squareCraft-items-center squareCraft-h-full">
            <div class="squareCraft-bg-494949 squareCraft-w-full squareCraft-px-2 squareCraft-py-1px ">
                <p class="squareCraft-text-sm squareCraft-font-light">Sf Pro sans</p>
            </div>
            <div class="squareCraft-bg-3f3f3f squareCraft-px-2" style="height: 27px; padding: 0 8px;">
                <img class="squareCraft-h-full squareCraft-rotate-180" width="12px"
                    src="https://fatin-webefo.github.io/squareCraft-Plugin/public/arrow.svg" alt="">

            </div>
        </div>
        <div class="squareCraft-flex squareCraft-text-white squareCraft-justify-between squareCraft-col-span-4  squareCraft-rounded-6px squareCraft-border squareCraft-border-solid squareCraft-border-585858 squareCraft-items-center squareCraft-h-full">
        <div class="squareCraft-flex squareCraft-text-white squareCraft-items-center squareCraft-w-full">
<div class="squareCraft-bg-494949 squareCraft-text-white squareCraft-px-2 squareCraft-w-full squareCraft-py-1px">
  <div class="squareCraft-dropdown squareCraft-w-full" id="squareCraftFontSizeDropdown">
    <div class="squareCraft-dropdown-header squareCraft-flex squareCraft-items-center squareCraft-justify-between squareCraft-bg-494949 squareCraft-text-white squareCraft-px-2 squareCraft-py-1px">
        <span id="squareCraftFontSizeSelected">16px</span>
        <img src="https://fatin-webefo.github.io/squareCraft-Plugin/public/arrow.svg" width="12px" />
    </div>
    <div class="squareCraft-dropdown-options squareCraft-hidden squareCraft-bg-3f3f3f squareCraft-w-full squareCraft-rounded-6px squareCraft-border squareCraft-border-585858" id="squareCraftFontSizeOptions">
    ${fontSizes?.map(size => `
        <div class="squareCraft-dropdown-item squareCraft-py-1px squareCraft-px-2 squareCraft-text-sm" data-value="${size}">${size}px</div>
    `).join('')}
</div>

</div>


</div>
<div class="squareCraft-border-r squareCraft-border-585858 squareCraft-h-full"></div>

</div>

           
        </div>
    </div>


    <div class="squareCraft-mt-2 squareCraft-grid squareCraft-px-2 squareCraft-w-full squareCraft-grid-cols-12 squareCraft-gap-2 ">
        <div class="squareCraft-flex squareCraft-col-span-7 squareCraft-justify-between squareCraft-border squareCraft-border-solid squareCraft-border-585858 squareCraft-rounded-6px squareCraft-items-center squareCraft-h-full">
            <div class="squareCraft-bg-494949 squareCraft-px-2 squareCraft-w-full  squareCraft-py-1px ">
                <p class="squareCraft-text-sm squareCraft-font-light">Regular</p>
            </div>
            <div class="squareCraft-bg-3f3f3f squareCraft-px-2" style="height: 27px; padding: 0 8px;">
                <img class="squareCraft-h-full squareCraft-rotate-180" width="12px"
                    src="https://fatin-webefo.github.io/squareCraft-Plugin/public/arrow.svg" alt="">

            </div>
        </div>
        <div class="squareCraft-flex squareCraft-justify-between squareCraft-col-span-4  squareCraft-rounded-6px squareCraft-border squareCraft-border-solid squareCraft-border-585858 squareCraft-items-center squareCraft-h-full">
        <div class="squareCraft-flex squareCraft-mx-auto squareCraft-items-center squareCraft-justify-center">
            <img class=" squareCraft-rounded-6px squareCraft-rotate-180" width="12px"
            src="https://fatin-webefo.github.io/squareCraft-Plugin/public/dot.svg" alt="">
        </div>
        <div class="squareCraft-border-r   squareCraft-border-585858 squareCraft-h-full"></div>
            <div class="squareCraft-flex squareCraft-mx-auto squareCraft-items-center squareCraft-justify-center squareCraft-border squareCraft-border-585858 squareCraft-w-13px squareCraft-border-solid squareCraft-h-13px">

            </div>
            <div class="squareCraft-border-r   squareCraft-border-585858 squareCraft-h-full"></div>
            
            <img class=" squareCraft-rounded-6px squareCraft-rotate-180 squareCraft-flex squareCraft-mx-auto squareCraft-items-center squareCraft-justify-center" width="12px"
            src="https://fatin-webefo.github.io/squareCraft-Plugin/public/gap.svg" alt="">
        </div>
    </div>



    <div class="squareCraft-mt-2"> </div>
</div>
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
      selectedElement.style.outline = "2px dashed #EF7C2F";
      console.log(`:white_check_mark: Selected Element: ${selectedElement.id}`);
    });

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
  document.addEventListener("DOMContentLoaded", function () {
    createWidget();
    attachEventListeners();
    fetchModifications();
    
    const dropdown = document.getElementById("squareCraftFontSizeDropdown");
    const selected = document.getElementById("squareCraftFontSizeSelected");
    const options = document.getElementById("squareCraftFontSizeOptions");

    if (!dropdown || !selected || !options) {
        console.error("Dropdown elements not found! Ensure they are correctly added to the DOM.");
        return;
    }

    options.innerHTML = fontSizes.map(size => `
        <div class="squareCraft-dropdown-item squareCraft-py-1px squareCraft-px-2 squareCraft-text-sm" data-value="${size}">${size}px</div>
    `).join('');

    dropdown.addEventListener("click", function (event) {
        event.stopPropagation();
        options.classList.toggle("squareCraft-hidden");
    });

    options.addEventListener("click", function (event) {
        if (event.target.classList.contains("squareCraft-dropdown-item")) {
            selected.textContent = event.target.textContent;
            selected.dataset.value = event.target.dataset.value;
            options.classList.add("squareCraft-hidden");

            if (selectedElement) {
                let css = { "font-size": event.target.dataset.value + "px" };
                applyStylesToElement(selectedElement.id, css);
                saveModifications(selectedElement.id, css);
            }
        }
    });

    document.addEventListener("click", function (event) {
        if (!dropdown.contains(event.target)) {
            options.classList.add("squareCraft-hidden");
        }
    });
});



})();
