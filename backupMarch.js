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
    
 
  
    document.body.addEventListener("click", (event) => {
        const targetBlock = event.target.closest('[id^="block-"]');
  
        if (
            widgetContainer &&
            !widgetContainer.contains(event.target) &&
            !targetBlock
        ) {
            console.log("🛑 Clicked outside. Hiding all elements.");
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

    
   function injectIcon() {
        const navContainer = parent.document.querySelector('ul.css-1tn5iw9');
        if (!navContainer) {
            console.warn("❌ Squarespace admin nav container not found.");
            return;
        }

        let icon = document.createElement("img");
        icon.src = "https://i.ibb.co/LXKK6swV/Group-29.jpg"; 
        icon.alt = "SquareCraft";
        icon.style.width = "25px";
        icon.style.height = "24px";
        icon.style.border = "1px solid #dddbdb";
        icon.style.borderRadius = "20%";
        icon.style.padding = "4px";
        icon.style.cursor = "pointer";
        icon.style.marginRight = "10px";
        icon.style.display = "inline-block";

        icon.classList.add("squareCraft-admin-icon");

        icon.addEventListener("click", () => {
            console.log("✅ SquareCraft icon clicked!");
            showFloatingMessage();
            createWidget();
        });

        navContainer.parentNode.insertBefore(icon, navContainer);
        console.log("✅ SquareCraft icon injected!");
    }

    function showFloatingMessage() {
        const existingMessage = parent.document.querySelector(".squareCraft-tooltip");
        if (existingMessage) return;

        const tooltip = document.createElement("div");
        tooltip.classList.add("squareCraft-tooltip");
        tooltip.innerHTML = "SquareCraft customizations are disabled. Click here to enable.";

        parent.document.body.appendChild(tooltip);

        setTimeout(() => {
            tooltip.remove();
        }, 3000); // Remove after 3 seconds
    }

    function waitForNavBar(attempts = 0) {
        if (attempts > 10) {
            console.error("❌ Failed to find Squarespace nav bar.");
            return;
        }
        const nav = parent.document.querySelector("ul.css-1tn5iw9");
        if (!nav) {
            setTimeout(() => waitForNavBar(attempts + 1), 500);
        } else {
            injectIcon();
        }
    }

    waitForNavBar();
    
    
  })();
  