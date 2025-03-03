(async function squareCraft() {
    const widgetScript = document.getElementById("squarecraft-script");
    if (!widgetScript) {
        console.error(":x: Widget script not found! Ensure the script tag exists with id 'squarecraft-script'.");
        return;
    }
  
    const token = widgetScript.dataset?.token;
    const squareCraft_u_id = widgetScript.dataset?.uId;
    const squareCraft_w_id = widgetScript.dataset?.wId;
  
    if (token) {
        localStorage.setItem("squareCraft_auth_token", token);
        document.cookie = `squareCraft_auth_token=${token}; path=/; domain=${location.hostname}; Secure; SameSite=Lax`;
    }
  
    if (squareCraft_u_id) {
        localStorage.setItem("squareCraft_u_id", squareCraft_u_id);
        document.cookie = `squareCraft_u_id=${squareCraft_u_id}; path=.squarespace.com;`;
    }
  
    if (squareCraft_w_id) {
        localStorage.setItem("squareCraft_w_id", squareCraft_w_id);
        document.cookie = `squareCraft_w_id=${squareCraft_w_id}; path=.squarespace.com;`;
    }
  
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.type = "text/css";
    link.href = "https://fatin-webefo.github.io/squareCraft-plugin/src/styles/parent.css";
    document.head.appendChild(link);
  
    let selectedElement = null;
    let widgetIcon = null;
    let widgetContainer = null;
  
    async function createWidget() {
        console.log("📥 Fetching widget module...");
        try {
            const module = await import("https://fatin-webefo.github.io/squareCraft-plugin/html.js");
            if (module && module.html) {
                console.log("✅ HTML module loaded successfully!");
    
                if (!widgetContainer) {
                    widgetContainer = document.createElement("div");
                    widgetContainer.id = "squarecraft-widget-container";
                    widgetContainer.classList.add("squareCraft-fixed", "squareCraft-text-color-white", "squareCraft-universal", "squareCraft-z-9999");
                    widgetContainer.innerHTML = module.html();
                    document.body.appendChild(widgetContainer);
    
                    widgetContainer.style.display = "block";
                    widgetContainer.style.borderRadius = "14px";
                    widgetContainer.style.opacity = "1";
                    widgetContainer.style.zIndex = "9999";
                    widgetContainer.style.position = "fixed";
                    widgetContainer.style.top = "100px";
                    widgetContainer.style.right = "100px";
    
                    console.log("✅ Widget container added:", widgetContainer);
                    console.log("📝 Widget HTML:", widgetContainer.innerHTML);
                    console.log("📌 Widget Computed Style:", getComputedStyle(widgetContainer));
                    makeWidgetDraggable();
                } else {
                    widgetContainer.classList.remove("squareCraft-hidden");
                }
            } else {
                console.error("❌ Failed to retrieve the HTML function from module!");
            }
        } catch (error) {
            console.error("🚨 Error loading HTML module:", error);
        }
    }
    
  
    function createWidgetIcon() {
        if (!widgetIcon) {
            widgetIcon = document.createElement("img");
            widgetIcon.id = "squarecraft-widget-icon";
            widgetIcon.src = "https://i.ibb.co/RGcBx7SF/Logo-Blue.png";
       
            widgetIcon.classList.add(
                "squareCraft-absolute",
                "squareCraft-hidden",
                "squareCraft-rounded-md",
                "squareCraft-w-12",
                "squareCraft-h-12",
                "squareCraft-rounded-lg",
                "squareCraft-bg-color-2c2c2c",
                "squareCraft-cursor-pointer",
                "squareCraft-z-9999",
                "squareCraft-widget-icon",
                "squareCraft-animate-border"
            );
            document.body.appendChild(widgetIcon);
  
            widgetIcon.addEventListener("click", (e) => {
                e.stopPropagation();
                widgetIcon.classList.add("squareCraft-hidden");
                createWidget();
            });
        }
        return widgetIcon;
    }
  
    document.body.addEventListener("click", (event) => {
        const targetBlock = event.target.closest('[id^="block-"]');
  
        if (
            widgetContainer &&
            !widgetContainer.contains(event.target) &&
            !widgetIcon?.contains(event.target) &&
            !targetBlock
        ) {
            console.log("🛑 Clicked outside. Hiding all elements.");
            widgetIcon?.classList.add("squareCraft-hidden");
            widgetContainer?.classList.add("squareCraft-hidden");
            document.querySelectorAll(".squareCraft-outline").forEach(el => {
                el.classList.remove("squareCraft-outline");
                el.style.outline = "";
            });
            return;
        }
  
        if (targetBlock) {
            console.log("✅ Target Block Clicked:", targetBlock.id);
  
            document.querySelectorAll(".squareCraft-outline").forEach(el => {
                el.classList.remove("squareCraft-outline");
                el.style.outline = "";
            });
  
            targetBlock.classList.add("squareCraft-outline");
            targetBlock.style.outline = "2px dashed #EF7C2F";
  
            selectedElement = targetBlock;
  
            widgetIcon = createWidgetIcon();
            widgetIcon.classList.remove("squareCraft-hidden");
  
            const rect = targetBlock.getBoundingClientRect();
            widgetIcon.style.top = `${window.scrollY + rect.top + 2 }px`;
            widgetIcon.style.left = `${window.scrollX + rect.right - 110}px`;
            widgetIcon.style.display = "block";
        }
    });

    function makeWidgetDraggable() {
        const widget = document.getElementById("squarecraft-widget-container");
    
        if (!widget) {
            console.warn("❌ Widget not found.");
            return;
        }
        widget.style.position = "fixed";
        widget.style.cursor = "grab";
        widget.style.zIndex = "999";
    
        let offsetX = 0, offsetY = 0, isDragging = false;
    
        widget.addEventListener("mousedown", (event) => {
            if (event.target.tagName === "INPUT" || event.target.tagName === "SELECT" || event.target.isContentEditable) {
                return; 
            }
    
            event.preventDefault();
            isDragging = true;
    
            offsetX = event.clientX - widget.getBoundingClientRect().left;
            offsetY = event.clientY - widget.getBoundingClientRect().top;
    
            widget.style.transition = "none";
            widget.style.userSelect = "none";
            widget.style.cursor = "grabbing";
    
            document.addEventListener("mousemove", moveAt);
            document.addEventListener("mouseup", stopDragging);
        });
    
        function moveAt(event) {
            if (!isDragging) return;
    
            let newX = event.clientX - offsetX;
            let newY = event.clientY - offsetY;
            newX = Math.max(0, Math.min(window.innerWidth - widget.offsetWidth, newX));
            newY = Math.max(0, Math.min(window.innerHeight - widget.offsetHeight, newY));
    
            widget.style.left = `${newX}px`;
            widget.style.top = `${newY}px`;
        }
    
        function stopDragging() {
            isDragging = false;
            widget.style.cursor = "grab";
            document.removeEventListener("mousemove", moveAt);
            document.removeEventListener("mouseup", stopDragging);
    
            localStorage.setItem("widget_X", widget.style.left);
            localStorage.setItem("widget_Y", widget.style.top);
        }
    
        let lastX = localStorage.getItem("widget_X");
        let lastY = localStorage.getItem("widget_Y");
        if (lastX && lastY) {
            widget.style.left = lastX;
            widget.style.top = lastY;
        } else {
            widget.style.left = "50px"; // Default position
            widget.style.top = "50px";
        }
    }
    
  })();
  