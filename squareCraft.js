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
  fetchModifications();
  
  const token = widgetScript?.dataset?.token || localStorage.getItem("squareCraft_auth_token");
  const userId = widgetScript.dataset?.uId || localStorage.getItem("squareCraft_u_id");
  const widgetId = widgetScript.dataset?.wId || localStorage.getItem("squareCraft_w_id");
  console.log(" widgetId: " + widgetId , "token: " + token, "userId: " + userId);

  if (token) localStorage.setItem("squareCraft_auth_token", token);
  if (userId) localStorage.setItem("squareCraft_u_id", userId);
  if (widgetId) localStorage.setItem("squareCraft_w_id", widgetId);

  let selectedElement = null;
  let appliedStyles = new Set();
  
  let pageId = getPageId();
  if (!pageId) console.warn("⚠️ No page ID found. Plugin may not work correctly.");
  function getPageId() {
    let pageElement = document.querySelector("article[data-page-sections]");
    return pageElement ? pageElement.getAttribute("data-page-sections") : null;
  }




  function applyStylesToElement(elementId, styles) {
    const element = document.getElementById(elementId);
    if (element) {
      for (let property in styles) {
        element.style[property] = styles[property];
      }
    }
  }

  async function fontfamilies() {
    const response = await fetch("https://www.googleapis.com/webfonts/v1/webfonts?key=AIzaSyBPpLHcfY1Z1SfUIe78z6UvPe-wF31iwRk");
    const data = await response.json();
    console.log(data);
    return data;
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
  
      if (!response.ok) {
        console.error(`❌ Error: HTTP status ${response.status}`);
        return;
      }
  
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
        <select class="squareCraft-text-sm squareCraft-font-light squareCraft-bg-494949 squareCraft-text-white" id="fontSizeDropdown">
            <option value="8">8px</option>
            <option value="10">10px</option>
            <option value="12">12px</option>
            <option value="14">14px</option>
            <option value="16">16px</option>
            <option value="18">18px</option>
            <option value="20">20px</option>
            <option value="22">22px</option>
            <option value="24">24px</option>
            <option value="26">26px</option>
            <option value="28">28px</option>
            <option value="30">30px</option>
            <option value="32">32px</option>
            <option value="34">34px</option>
            <option value="36">36px</option>
            <option value="38">38px</option>
            <option value="40">40px</option>
            <option value="42">42px</option>
            <option value="44">44px</option>
            <option value="46">46px</option>
            <option value="48">48px</option>
            <option value="50">50px</option>
            <option value="52">52px</option>
            <option value="54">54px</option>
            <option value="56">56px</option>
            <option value="58">58px</option>
            <option value="60">60px</option>
            <option value="62">62px</option>
            <option value="64">64px</option>
            <option value="66">66px</option>
            <option value="68">68px</option>
            <option value="70">70px</option>
            <option value="72">72px</option>
            <option value="74">74px</option>
            <option value="76">76px</option>
            <option value="78">78px</option>
            <option value="80">80px</option>
        </select>
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
    document.body.addEventListener("change", async (event) => {
      if (event.target.id === "fontSizeDropdown") {
        const fontSize = event.target.value;
        
        if (!selectedElement) return;

        let css = {
          "font-size": fontSize + "px",
        };

        applyStylesToElement(selectedElement.id, css);
        await saveModifications(selectedElement.id, css);
      }
    });
  }


  

  function attachEventListeners() {
    document.body.addEventListener("click", (event) => {
      let block = event.target.closest('[id^="block-"], section, .sqs-block');
      if (!block) return;
  
      if (selectedElement) selectedElement.style.outline = "";
      selectedElement = block;
      selectedElement.style.outline = "2px dashed #EF7C2F";
  
      console.log(`✅ Selected Element: ${selectedElement.id}`);
    });
  
    document.getElementById("squareCraftFontSize").addEventListener("input", updateStylesAndSave);
    document.getElementById("squareCraftBgColor").addEventListener("input", updateStylesAndSave);
    document.getElementById("squareCraftBorderRadius").addEventListener("input", updateStylesAndSave);
  
    async function updateStylesAndSave() {
      if (!selectedElement) {
        console.warn("⚠️ No element selected.");
        return;
      }
  
      let css = {
        "font-size": document.getElementById("squareCraftFontSize").value + "px",
        "background-color": document.getElementById("squareCraftBgColor").value,
        "border-radius": document.getElementById("squareCraftBorderRadius").value + "px"
      };
  
      applyStylesToElement(selectedElement.id, css);
      await saveModifications(selectedElement.id, css);
  
      console.log("✅ Styles Applied and Saved Automatically!");
    }
  }

  document.addEventListener("DOMContentLoaded", () => {
    createWidget();
    attachEventListeners();
    fetchModifications();
    saveModifications();
    fontfamilies();
  });
})();
