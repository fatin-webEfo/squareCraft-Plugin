(async function squareCraft() {
    const widgetScript = document.getElementById("squarecraft-script");
    if (!widgetScript) {
        console.error("❌ Widget script not found! Ensure the script tag exists with id 'squarecraft-script'.");
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
    let widgetLoaded = false;

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
                    widgetContainer.style.display = "none"; // Initially hidden
                    document.body.appendChild(widgetContainer);

                    console.log("✅ Widget container added:", widgetContainer);
                    makeWidgetDraggable();
                    widgetLoaded = true;
                }
            } else {
                console.error("❌ Failed to retrieve the HTML function from module!");
            }
        } catch (error) {
            console.error("🚨 Error loading HTML module:", error);
        }
    }

    function toggleWidgetVisibility() {
        if (!widgetLoaded) {
            createWidget().then(() => {
                widgetContainer.style.display = "block";
            });
        } else {
            if (widgetContainer.style.display === "none") {
                widgetContainer.style.display = "block";
            } else {
                widgetContainer.style.display = "none";
            }
        }
    }

    function makeWidgetDraggable() {
        if (!widgetContainer) return;

        widgetContainer.style.position = "fixed";
        widgetContainer.style.cursor = "grab";
        widgetContainer.style.zIndex = "999";
        widgetContainer.style.left = "calc(100% - 250px)";
        widgetContainer.style.top = "100px";

        let offsetX = 0, offsetY = 0, isDragging = false;

        widgetContainer.addEventListener("mousedown", (event) => {
            if (event.target.tagName === "INPUT" || event.target.tagName === "SELECT" || event.target.isContentEditable) return;

            event.preventDefault();
            isDragging = true;

            offsetX = event.clientX - widgetContainer.getBoundingClientRect().left;
            offsetY = event.clientY - widgetContainer.getBoundingClientRect().top;

            document.addEventListener("mousemove", moveAt);
            document.addEventListener("mouseup", stopDragging);
        });

        function moveAt(event) {
            if (!isDragging) return;
            let newX = Math.max(0, Math.min(window.innerWidth - widgetContainer.offsetWidth, event.clientX - offsetX));
            let newY = Math.max(0, Math.min(window.innerHeight - widgetContainer.offsetHeight, event.clientY - offsetY));
            widgetContainer.style.left = `${newX}px`;
            widgetContainer.style.top = `${newY}px`;
        }

        function stopDragging() {
            isDragging = false;
            document.removeEventListener("mousemove", moveAt);
            document.removeEventListener("mouseup", stopDragging);
        }
    }

    function injectIcon() {
        const navContainer = parent.document.querySelector('ul.css-1tn5iw9');
    
        if (!navContainer) {
            console.warn("❌ Squarespace admin nav container not found.");
            return;
        }
        let iconSrc = localStorage.getItem("squareCraft_icon") || "https://i.ibb.co/LXKK6swV/Group-29.jpg";
        let toolbarIconSrc = localStorage.getItem("squareCraft_toolbar_icon") || "https://i.ibb.co/LXKK6swV/Group-29.jpg";
    
        localStorage.setItem("squareCraft_icon", iconSrc);
        localStorage.setItem("squareCraft_toolbar_icon", toolbarIconSrc);
        let icon = document.createElement("img");
        icon.src = iconSrc;
        icon.alt = "SquareCraft";
        icon.style.width = "25px";
        icon.style.height = "24px";
        icon.style.border = "1px solid #dddbdb";
        icon.style.background = "#fcf4ee";
        icon.style.borderRadius = "20%";
        icon.style.padding = "4px";
        icon.style.margin = "0px 6px";
        icon.style.cursor = "pointer";
        icon.style.display = "inline-block";
        icon.classList.add("squareCraft-admin-icon", "squareCraft-z-99999");
    
        let toolbaricon = document.createElement("img");
        toolbaricon.src = toolbarIconSrc;
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
        toolbaricon.classList.add("squareCraft-toolbar-icon", "squareCraft-z-99999");
    
        if (!document.querySelector(".squareCraft-admin-icon")) {
            navContainer.parentNode.insertBefore(icon, navContainer);
        }
        
        if (!document.querySelector(".squareCraft-toolbar-icon")) {
            navContainer.parentNode.insertBefore(toolbaricon, navContainer);
        }
    
        toolbaricon.addEventListener("click", function () {
            toggleWidgetVisibility();
            console.log("✅ Toolbar icon clicked, toggling widget visibility.");
        });
    
        console.log("✅ SquareCraft icons injected into the nav bar!");
    
        function injectIconIntoTargetElements() {
            const targetElements = parent.document.querySelectorAll(".tidILMJ7AVANuKwS");
    
            if (targetElements.length === 0) {
                console.warn("❌ Target elements not found. Retrying in 1 second...");
                setTimeout(injectIconIntoTargetElements, 1000);
                return;
            }
    
            targetElements.forEach((element) => {
                if (!element.parentNode || element.parentNode.querySelector(".squareCraft-admin-icon")) return;
    
                let wrapper = document.createElement("div");
                wrapper.style.display = "flex";
                wrapper.style.alignItems = "center";
    
                let clonedIcon = toolbaricon.cloneNode(true);
    
                element.parentNode.insertBefore(wrapper, element);
                wrapper.appendChild(clonedIcon);
                wrapper.appendChild(element);
    
                console.log("✅ SquareCraft icon injected beside target element:", element);
            });
    
            setTimeout(injectIconIntoTargetElements, 1000); // Keep checking every second
        }
    
        injectIconIntoTargetElements();
    }
    

})();
