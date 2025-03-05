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
    
        let lastLeft = localStorage.getItem("widget_left");
        let lastTop = localStorage.getItem("widget_top");
    
        if (lastLeft && lastTop) {
            widget.style.left = lastLeft;
            widget.style.top = lastTop;
        } else {
            widget.style.left = "calc(100% - 250px)"; // Default: Start from right
            widget.style.top = "100px";
        }
    
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
    
            let newX = Math.max(0, Math.min(window.innerWidth - widget.offsetWidth, event.clientX - offsetX));
            let newY = Math.max(0, Math.min(window.innerHeight - widget.offsetHeight, event.clientY - offsetY));
    
            widget.style.left = `${newX}px`;
            widget.style.top = `${newY}px`;
        }
    
        function stopDragging() {
            isDragging = false;
            widget.style.cursor = "grab";
            document.removeEventListener("mousemove", moveAt);
            document.removeEventListener("mouseup", stopDragging);
    
            localStorage.setItem("widget_left", widget.style.left);
            localStorage.setItem("widget_top", widget.style.top);
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
        icon.style.background = "#fcf4ee"
        icon.style.borderRadius = "20%";
        icon.style.padding = "4px";
        icon.style.margin = "0px 6px";
        icon.style.cursor = "pointer";
        icon.style.display = "inline-block";
    
        icon.classList.add("squareCraft-admin-icon");

        let toolbaricon = document.createElement("img");
        toolbaricon.src = "https://i.ibb.co/LXKK6swV/Group-29.jpg";
        toolbaricon.alt = "SquareCraft";
        toolbaricon.style.width = "25px";
        toolbaricon.style.height = "24px";
        toolbaricon.style.border = "1px solid #dddbdb";
        toolbaricon.style.borderRadius = "20%";
        toolbaricon.style.background = "#fcf4ee";
        toolbaricon.style.padding = "4px";
        toolbaricon.style.marginLeft = "6px";
        toolbaricon.style.cursor = "pointer";
        toolbaricon.style.display = "inline-block";
        toolbaricon.classList.add("squareCraft-admin-icon");
    
        toolbaricon.addEventListener("click", () => { 
            console.log("✅ SquareCraft icon clicked!");
            createWidget();
        });
    
        navContainer.parentNode.insertBefore(icon.cloneNode(true), navContainer);
        console.log("✅ SquareCraft icon injected into nav bar!");
    
        function injectIconIntoTargetElements() {
            const targetElements = parent.document.querySelectorAll(".tidILMJ7AVANuKwS");
    
            if (targetElements.length === 0) {
                console.warn("❌ Target elements not found. Retrying...");
                setTimeout(injectIconIntoTargetElements, 1000); 
              
            }
    
            targetElements.forEach((element) => {
                if (!element.parentNode || element.parentNode.querySelector(".squareCraft-admin-icon")) return;
    
                let wrapper = document.createElement("div");
                wrapper.style.display = "flex";
                wrapper.style.alignItems = "center";
                wrapper.style.gap = "6px";
    
                let clonedIcon = toolbaricon.cloneNode(true);
    
                element.parentNode.insertBefore(wrapper, element);
                wrapper.appendChild(clonedIcon);
                wrapper.appendChild(element);
    
                console.log("✅ SquareCraft icon injected beside target element:", element);
            });
    
            setTimeout(injectIconIntoTargetElements, 1000); // Keep checking every second
        }
    
        injectIconIntoTargetElements(); // Start the loop
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
  