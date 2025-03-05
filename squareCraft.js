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
    
        // ✅ Ensure navbar icon is added only once
        if (!parent.document.querySelector(".squareCraft-admin-icon")) {
            let icon = document.createElement("img");
            icon.src = iconSrc;
            icon.alt = "SquareCraft";
            icon.classList.add("squareCraft-admin-icon", "squareCraft-z-99999");
            Object.assign(icon.style, {
                width: "25px",
                height: "24px",
                border: "1px solid #dddbdb",
                background: "#fcf4ee",
                borderRadius: "20%",
                padding: "4px",
                margin: "0px 6px",
                cursor: "pointer",
                display: "inline-block"
            });
    
            navContainer.parentNode.insertBefore(icon, navContainer);
            console.log("✅ SquareCraft admin icon injected.");
        }
    
        // ✅ Ensure toolbar icon is added only once
        if (!parent.document.querySelector(".squareCraft-toolbar-icon")) {
            let toolbaricon = document.createElement("img");
            toolbaricon.src = toolbarIconSrc;
            toolbaricon.alt = "SquareCraft";
            toolbaricon.classList.add("squareCraft-toolbar-icon", "squareCraft-z-99999");
            Object.assign(toolbaricon.style, {
                width: "25px",
                height: "24px",
                border: "1px solid #dddbdb",
                borderRadius: "20%",
                background: "#fcf4ee",
                padding: "4px",
                marginLeft: "6px",
                cursor: "pointer",
                display: "inline-block"
            });
    
            // ✅ Attach click event once to toggle widget visibility correctly
            toolbaricon.addEventListener("click", function () {
                console.log("✅ Toolbar icon clicked!");
                toggleWidgetVisibility();
            });
    
            navContainer.parentNode.insertBefore(toolbaricon, navContainer);
            console.log("✅ SquareCraft toolbar icon injected.");
        }
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
