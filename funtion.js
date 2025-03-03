! function() {
    function e() {
        var e = document.createEvent("HTMLEvents");
        e.initEvent("resize", !0, !1), window.dispatchEvent(e)
    }

    function t(e, t) {
        for (var o in e)
            if (o.startsWith("__reactInternalInstance$") || o.startsWith("__reactFiber$")) try {
                if (e[o]._currentElement) {
                    var n = e[o]._currentElement,
                        a = n._owner,
                        r = a._instance;
                    return r
                }
                if (e[o].child && e[o].child.props && !t) return e[o].child;
                if (e[o].child && e[o].child.pendingProps && !t) return e[o].child;
                if (e[o].pendingProps && !t) return e[o].pendingProps.children && e[o].pendingProps.children._owner ? e[o].pendingProps.children._owner.stateNode : e[o].pendingProps.children && e[o].pendingProps.children[0] && e[o].pendingProps.children[0]._owner ? e[o].pendingProps.children && e[o].pendingProps.children[0]._owner.stateNode : e[o].return.stateNode ? e[o].return.stateNode : {};
                if (e[o].pendingProps && e[o].pendingProps.children) {
                    var i = !1;
                    return e[o].pendingProps && e[o].pendingProps.children && e[o].pendingProps.children.forEach && e[o].pendingProps.children.forEach(function(e) {
                        e && e._owner && !i && (i = e._owner)
                    }), i && i.stateNode && i.stateNode.props ? i.stateNode : i
                }
                return e[o]
            } catch (e) {
                H.log(e)
            }
        return null
    }

    function o(e, t, o) {
        var n;
        return function() {
            var a = this,
                r = arguments,
                i = function() {
                    n = null, o || e.apply(a, r)
                },
                s = o && !n;
            clearTimeout(n), n = setTimeout(i, t), s && e.apply(a, r)
        }
    }

    function n(e, t, o) {
        if (!o.querySelector("#" + t)) {
            o = o || document.getElementsByTagName("head")[0];
            var n = document.createElement("link");
            n.id = t, n.rel = "stylesheet", n.type = "text/css", n.href = e + "?cache=" + +((new Date).getTime() + "").substr(0, 8), n.media = "all", o.appendChild(n)
        }
    }

    function a(e, t, o, n) {
        if (o = o || document.getElementsByTagName("head")[0], t && o.querySelector("#" + t)) n && n(this);
        else {
            var a = document.createElement("link");
            a.href = e, a.rel = "stylesheet", a.onload = function() {
                n && n(null, {
                    nodes: [this]
                })
            }, o.appendChild(a)
        }
    }

    function r(e, t, o, n, a) {
        if (o = o || document.getElementsByTagName("head")[0], t && o.querySelector("#" + t)) n && n(this);
        else {
            var r = document.createElement("script");
            r.src = e, r.id = t, r.onload = function() {
                a && this.remove(), n && n(this)
            }, o.appendChild(r)
        }
    }

    function i(e) {
        try {
            if (e) {
                var t = e.get("contentBox"),
                    o = function(o) {
                        if (o = o.newVal ? o : {
                                newVal: e.getValue()
                            }, !t.one(".sqstp-charCount-wrap")) {
                            var n = t.one(".cke_inner") ? t.one(".cke_inner") : !!t.one("[contenteditable]") && t.one("[contenteditable]").get("parentNode");
                            n && (n.setStyle("position", "relative"), n.append('<div class="sqstp-charCount-wrap"><span class="chars-length">0</span><span class="words-length">0</span><span class="spaces-length">0</span></div>'))
                        }
                        if (t.one(".sqstp-charCount-wrap")) {
                            var a = o.newVal && o.newVal.html ? o.newVal.html.replace(/\&nbsp;/g, " ") : "",
                                r = document.createElement("div");
                            if (r.innerHTML = a, r) {
                                var i = r.textContent,
                                    s = i.trim().replace(/\n/g, " ").replace(/[ ]{2,}/gi, " ").match(/\w+/g);
                                t.one(".chars-length").set("textContent", i.length), t.one(".words-length").set("textContent", s ? s.length : 0), t.one(".spaces-length").set("textContent", i.split(" ").length - 1), r.remove()
                            } else t.one(".chars-length").set("textContent", 0), t.one(".words-length").set("textContent", 0), t.one(".spaces-length").set("textContent", 0)
                        }
                    };
                e.after("dataChange", o), e.after("render", o)
            }
        } catch (e) {
            H.log(e)
        }
    }

    function s(e) {
        var t, o = "dataChange";
        try {
            e._node ? (t = e.get("parentNode"), o = "valuechange") : t = e.get("contentBox");
            var n = function(e) {
                if (t.one(".sqstp-charCount-wrap") || (t.append('<div class="sqstp-charCount-wrap"><span class="chars-length">0</span><span class="words-length">0</span><span class="spaces-length">0</span></div>'), t.one(".description")), t.one(".sqstp-charCount-wrap")) {
                    var o = e.hasOwnProperty("newVal") ? e.newVal : !!e.currentTarget && e.currentTarget.get("value");
                    if (o) {
                        var n = o.trim().replace(/\n/g, " ").replace(/[ ]{2,}/gi, " ").match(/\w+/g);
                        t.one(".chars-length").set("textContent", o.length), t.one(".words-length").set("textContent", n ? n.length : 0), t.one(".spaces-length").set("textContent", o.split(" ").length - 1)
                    } else t.one(".chars-length").set("textContent", 0), t.one(".words-length").set("textContent", 0), t.one(".spaces-length").set("textContent", 0)
                }
            };
            e._changeEvent || (e._changeEvent = e.on(o, n), e._node ? n({
                currentTarget: e
            }) : n({
                newVal: e.getValue()
            }))
        } catch (e) {
            H.log(e)
        }
    }

    function l(e, t) {
        var o = e.querySelectorAll("a[data-index]"),
            n = e.querySelector("a[data-index].active");
        if (n) {
            var a = o.length - 1,
                r = parseInt(n.dataset.index),
                i = "up" == t ? r - 1 : r + 1;
            i < 0 ? i = a : i > a && (i = 0);
            var s = e.querySelector('a[data-index="' + i + '"]');
            s && s.click()
        }
    }

    function c(e) {
        e.querySelector('input[type="range"]') && e.querySelectorAll('input[type="range"]').forEach(function(e) {
            e.max && (e.max = 250)
        })
    }

    function d(e) {
        try {
            Z = e;
            var o = e.querySelectorAll('a[class*="NavItem-container"], a[tabindex]');
            if (o && o.length && o.forEach(function(e, t) {
                    0 == t ? e.classList.add("active") : e.classList.remove("active");
                    var o = e.textContent.replace(/ /g, "").toLowerCase();
                    e.dataset.name = "feeds" == o ? "rss" : o, e.dataset.index = t
                }), -1 == e.parentNode.className.indexOf("ui-tweaks-activated")) {
                var n = t(e, !0);
                if (n && (n.props && n.props.value && n.props.value.navigationTitle || n.props && n.props.collectionTypeName)) {
                    e.parentNode.classList.add("ui-tweaks-activated");
                    var a = e.querySelector('[class*="NavText-title-"]');
                    if (!a && n.props.title && e.querySelectorAll("p").forEach(function(e) {
                            e.textContent && e.textContent == n.props.title && (a = e)
                        }), a) {
                        var r = document.createElement("div");
                        r.className = "title-descr", r.textContent = "You may use Up/Down keys to navigate", r.style = "font-size:10px;line-height:1;margin-top:10px;opacity:.8", a.appendChild(r)
                    }
                    if (setTimeout(function() {
                            c(e)
                        }, 200), n.handleSelectCategory) {
                        var i = n.handleSelectCategory;
                        n.handleSelectCategory = function(t) {
                            i.apply(this, arguments), t = t && t.length ? t.toLowerCase() : t, setTimeout(function() {
                                c(e)
                            }, 200), o && o.length && o.forEach(function(e, o) {
                                t && e.dataset.name == t || t && e.dataset.name == t.replace("nested", "") || 0 == o && null == t ? e.classList.add("active") : e.classList.remove("active")
                            })
                        }
                    }
                    if (n.props && n.props.configurations && n.props.configurations.default && n.props.configurations.default.uiSchema && n.props.configurations.default.uiSchema.length) {
                        n.props.configurations.default.value;
                        if (n.props.configurations.default.uiSchema[0] && n.props.configurations.default.uiSchema[0].properties && n.props.configurations.default.uiSchema[0].properties.children) {
                            var s = !1;
                            n.props.configurations.default.uiSchema[0].properties.children.forEach(function(e) {
                                "#/title" == e.$mapping && (s = !0)
                            }), s || (H.log("Need Add Title!!!"), n.props.configurations.default.uiSchema[0].properties.children.unshift({
                                type: "string",
                                properties: {
                                    placeholder: "Text Here",
                                    label: "Title",
                                    maxLength: 100,
                                    inline: !1,
                                    htmlAttributes: {
                                        "data-content-field": "title"
                                    },
                                    description: "The name for this page, as it appears in navigations."
                                },
                                $mapping: "#/title"
                            }), n.updater && n.updater.enqueueForceUpdate(n))
                        }
                    }
                }
            }
        } catch (e) {
            H.log(e)
        }
    }

    function p(e, t, o) {
        var n = "structuredContent,addedOn,publishOn,updatedOn,startDate,endDate,categories,tags,author,title,urlId,fullUrl,starred,collectionId,id,assetUrl,filename,items,recordType,recordTypeLabel,commentCount,workflowState";
        return ("products" == t || o) && (n = ""), new Promise(function(t) {
            function o(e, n) {
                n && (r.start = n), Y.io("/api/content-collections/" + e + "/content-items", {
                    data: r,
                    on: {
                        success: function(r, i) {
                            var s;
                            try {
                                s = JSON.parse(i.responseText), s.results && s.results.length ? (a = s.results ? a.concat(s.results) : [], s.nextPageStart && n !== s.nextPageStart ? o(e, s.nextPageStart) : t(a)) : t(a)
                            } catch (e) {
                                return H.log("JSON Parse failed!"), !1
                            }
                        },
                        failure: function(e) {
                            H.warn("error : " + e.message), t(a)
                        }
                    }
                })
            }
            var a = [],
                r = {
                    limit: 250,
                    html: 0,
                    fields: n
                };
            o(e)
        })
    }

    function u(e) {
        var t = -parseInt(Static.SQUARESPACE_CONTEXT.website.timeZoneOffset, 10) / 6e4,
            o = (new Date).getTimezoneOffset(),
            n = t - o;
        return new Date(e - 6e4 * n)
    }

    function m(e) {
        var t, o, n = e.structuredContent,
            a = new Date(n.startDate),
            r = new Date(n.endDate);
        return a.toDateString() === r.toDateString() ? (t = window.top.Y.Date.format(u(n.startDate), {
            format: "%d %b %Y %H:%M %p"
        }), o = window.top.Y.Date.format(u(n.endDate), {
            format: "%H:%M %p"
        })) : (t = window.top.Y.Date.format(u(n.startDate), {
            format: "%d %b %Y %H:%M %p"
        }), o = window.top.Y.Date.format(u(n.endDate), {
            format: "%d %b %Y %H:%M %p"
        })), (a ? t + "&nbsp;&mdash;&nbsp;" : "") + (r ? o : "")
    }

    function g(e) {
        return e ? e.replace(/&/g, "&amp;").replace(/>/g, "&gt;").replace(/</g, "&lt;").replace(/"/g, "&quot;").replace(/'/g, "&#x27;").replace(/`/g, "&#x60;") : e
    }

    function f(e) {
        var t = (new Date).getTime();
        return new Date(e.endDate).getTime() > t ? ",Upcoming" : ",Past"
    }

    function w(e) {
        var t = "";
        if ("store-item" == e.recordTypeLabel) {
            var o = window.top.Y.Squarespace.Commerce.getTotalStockRemaining(e),
                n = e.structuredContent && 2 !== e.structuredContent.productType && e.structuredContent.variants && e.structuredContent.variants.length || "0";
            o = "Infinity" == o ? "âˆž" : o, t += '<div class="product-meta"><span class="product-price">' + window.top.Y.Squarespace.Commerce.priceString(e) + '</span><span class="instock">Stock: ' + o + '</span><span class="variants">Variants: ' + n + "</span></div>"
        }
        var a = '<span class="date">' + window.top.Y.Date.format(u(e.addedOn), {
            format: "%d/%m/%Y"
        }) + "</span>";
        if ("event" == e.recordTypeLabel) {
            var r = m(e);
            a = '<span class="date">' + r + "</span>"
        }
        var i = e.startDate || e.addedOn,
            s = "";
        e.endDate && (s = f(e));
        var l = document.createElement("div"),
            c = '<div class="sqs-item-view sqs-item-view-custom sqs-item-view-' + e.recordTypeLabel + '" data-date="' + i + '" data-status="' + G[e.workflowState] + s + '" data-title="' + (g(e.title) || "") + '" data-item-id="' + e.id + '"><div class="sqs-item-view-content"><div class="list-item has-thumbnail "><div class="thumb" style="background-image:url(' + (e.items && e.items[0] && e.items[0].assetUrl || e.assetUrl) + '?format=300w"></div><div class="content-wrapper"><header class="list-item-header"><h2 class="has-title"><span class="title">' + e.title + '</span></h2></header><div class="meta"><span class="status">' + G[e.workflowState] + "</span>" + a + '<span class="separator">&nbsp;Â·&nbsp;</span><span class="display-name">' + e.author.displayName + "</span>" + t + '</div><div class="buttons controls"><div class="button button-edit button-custom-edit" data-edit-id="' + e.id + '" attr-button-name="edit" style="line-height:44px">Edit</div><div class="button button-delete button-custom-delete" data-delete-id="' + e.id + '" attr-button-name="delete" style="line-height:44px">Delete</div></div></div></div></div></div>';
        l.innerHTML = c;
        var d = l.firstElementChild;
        return l = null, d
    }

    function h(e) {
        var t = e.parentElement.parentElement,
            o = e && "new" == e.dataset.button ? e : t ? window.top.Y.Widget.getByNode(t) : window.top.Y.one(".sqs-content-manager-blog-content") ? window.top.Y.Widget.getByNode(Y.one(".sqs-content-manager-blog-content")) : null;
        if (o) try {
            var n = o.dataset ? o.dataset.collectionId : o.get("collection").get("id"),
                i = o.dataset ? o.dataset.type : o.get("collection").get("typeLabel"),
                s = window.top.Y.one(".sqs-damask-panel-content"),
                l = e && e.dataset.button ? "new-custom-view-list" : "",
                c = window.top.Y.one(".sqs-list-view-custom") || window.top.Y.Node.create('<div class="sqs-list-view sqs-list-view-custom ' + l + '"><div class="custom-filter-grid"></div></div></div>');
            s.one(".sqs-list-view.sqs-widget");
            if (n) {
                var d = function() {
                    window.top.document.body.className.indexOf("sqs-content-manager-product-grid-maximized") > -1 ? (s.removeClass("custom-filter-position-top"), s.addClass("custom-filter-position-left")) : (s.addClass("custom-filter-position-top"), s.removeClass("custom-filter-position-left"))
                };
                window.top.Y.one('link[href*="custom-filter/custom-filter.min.css"]') || a("https://assets.squarewebsites.org/custom-filter/custom-filter.min.css", "custom-filter-styles", window.top.document.head, null), s.one(".sqs-list-view-custom") ? d() : p(n, i).then(function(o) {
                    var a = new Y.NodeList;
                    o ? (i && i.indexOf("events") > -1 && o.sort(function(e, t) {
                        return parseInt(t.startDate) - parseInt(e.startDate)
                    }), o.forEach(function(e) {
                        var t = w(e);
                        !t.f_matches && Element.prototype.f_matches && (t.f_matches = Element.prototype.f_matches), a.push(t)
                    }), e && e.dataset.button ? s.prepend(c) : s.append(c)) : H.warn("No Items were fetched.");
                    var l = {
                        container: ".sqs-damask-panel-content",
                        items: ".sqs-item-view-custom",
                        index: 0,
                        settings: {
                            itemsParent: ".custom-filter-grid",
                            requestAttrWithAjax: !1,
                            align: "space-between",
                            mobilePanel: {
                                enabled: !1
                            },
                            clearAllButton: {
                                enabled: !0,
                                text: "Clear All",
                                place: "before"
                            },
                            hooks: {
                                beforeInit: function(e) {
                                    e.coll_data = {
                                        collection: {
                                            id: n
                                        },
                                        items: o
                                    }
                                },
                                afterFilter: function(e) {
                                    e.itemsParent.all("[data-first-upcoming],[data-first-past]").removeAttribute("data-first-upcoming").removeAttribute("data-first-past");
                                    var t = e.itemsParent.one(".status-upcoming"),
                                        o = e.itemsParent.one(".status-past");
                                    t && t.setAttribute("data-first-upcoming", "true"), o && o.setAttribute("data-first-past", "true")
                                }
                            },
                            useSQSProxy: {
                                enabled: !1
                            },
                            updateFilterOptions: {
                                enabled: !1,
                                nonExistOptions: {
                                    hide: !1,
                                    disable: !1,
                                    disableHard: !0
                                },
                                showOptionsCounters: !0,
                                optionsCounterWrap: "- ()"
                            },
                            pagination: {
                                enabled: !0,
                                pageSize: 20,
                                margin: "12px 0",
                                padding: "0",
                                align: "center",
                                pagesRange: 2,
                                pagesAround: 1,
                                showPrevNext: {
                                    enabled: !0,
                                    hideItems: !1,
                                    next: "Next",
                                    prev: "Prev"
                                },
                                items: {
                                    style: "square",
                                    width: "24px",
                                    margin: "8px",
                                    borderWidth: "1px",
                                    backgroundColor: "#fff",
                                    activeBackgroundColor: "#555",
                                    color: "#000",
                                    activeColor: "#fff"
                                }
                            },
                            simpleFilter: {
                                show: {
                                    effect: "fade",
                                    transitionDuration: 200,
                                    stagger: 30
                                },
                                hide: {
                                    effect: "fade",
                                    transitionDuration: 50,
                                    stagger: 18
                                }
                            },
                            search: {
                                text: "Search Titles",
                                positionOrder: 1
                            },
                            filter: {
                                cacheOptions: !1,
                                category: !1,
                                tag: !1,
                                items: [{
                                    name: "Category",
                                    multiple: !0,
                                    multipleLogic: "and",
                                    logic: "and",
                                    getAttr: "categories"
                                }, {
                                    name: "Tags",
                                    multiple: !0,
                                    multipleLogic: "and",
                                    logic: "and",
                                    getAttr: "tags"
                                }, {
                                    name: "Status",
                                    options: ["Upcoming", "Past", "Published", "Draft", "Needs Review", "Scheduled"],
                                    allowedOptions: ["Upcoming", "Past", "Published", "Draft", "Needs Review", "Scheduled"],
                                    multiple: !0,
                                    sort: "asAllowed",
                                    getAttr: function(e) {
                                        return e.getAttribute("data-status").split(",")
                                    }
                                }]
                            },
                            sort: {
                                enabled: !0,
                                items: [{
                                    name: "Price",
                                    order: "asc|desc",
                                    orderTexts: "$-$$$|$$$-$"
                                }, {
                                    name: "A-Z",
                                    showOrder: !1,
                                    sort: "[data-title]",
                                    order: "asc"
                                }, {
                                    name: "Z-A",
                                    showOrder: !1,
                                    sort: "[data-title]",
                                    order: "desc"
                                }, {
                                    name: "Older",
                                    showOrder: !1,
                                    sort: "[data-date]",
                                    order: "asc"
                                }, {
                                    name: "Newer",
                                    showOrder: !1,
                                    sort: "[data-date]",
                                    order: "desc"
                                }]
                            }
                        }
                    };
                    window.top.CustomSQSFilter ? (s.customFilter = new window.top.CustomSQSFilter(s, l), window.top.Y.one(t).addClass("cf-active"), s.customFilter.addVirtualItems(a), s.customFilter.items = s.customFilter.virtual_list, s.customFilter._sortGrid(), d()) : r("https://assets.squarewebsites.org/custom-filter/custom-filter.min.js", "custom-filter-script", window.top.document.head, function() {
                        s.customFilter = new window.top.CustomSQSFilter(s, l), window.top.Y.one(t).addClass("cf-active"), s.customFilter.addVirtualItems(a), s.customFilter.items = a, s.customFilter._sortGrid(), d()
                    })
                }), window.top.Y.one(t).toggleClass("cf-active")
            }
        } catch (e) {
            H.log(e)
        }
    }

    function v(e) {
        return e ? e.charAt(0).toUpperCase() + e.slice(1).toLowerCase() : ""
    }

    function b(e) {
        var t = e.getAttribute("data-edit-id");
        if (t) {
            var o = new window.top.Y.Squarespace.Models.ContentItem({
                id: t
            });
            o.load(function(e, t) {
                if (t && t.id && t.recordType) {
                    var n = v(window.top.Y.Squarespace.Enums.RecordType.stringForValue(t.recordType));
                    "Store_item" == n && (n = "Product" + J[t.productType]);
                    var a = window.top.Y.Squarespace.ContentItemEditorFactory;
                    if (n && a) try {
                        var r = new window.top.Y.Squarespace.ContentItemEditor[n]({
                            dialog: a.getEditor(o),
                            model: o
                        });
                        r.show()
                    } catch (e) {
                        H.log(e)
                    }
                } else H.warn(e)
            })
        } else H.warn("We can not get the id attribute!")
    }

    function y(e) {
        var t = e.getAttribute("data-delete-id");
        if (t) {
            var o = new window.top.Y.Squarespace.Models.ContentItem({
                id: t
            });
            o.load(function(e, n) {
                n && n.id ? new window.top.Y.Squarespace.Widgets.Confirmation({
                    "strings.title": "Delete Item",
                    "strings.message": "Are you sure you wish to remove this item?"
                }).on("confirm", function() {
                    o._delete(function(e, o) {
                        var n = window.top.Y.one(".custom-filter-container");
                        n && n.customFilter && n.customFilter.virtual_list.size() && n.customFilter.virtual_list.each(function(e, o) {
                            t == e.getAttribute("data-item-id") && (e.remove(), n.customFilter.virtual_list._nodes.splice(o, 1), n.customFilter._sortGrid())
                        })
                    })
                }) : H.warn(e)
            })
        } else H.warn("We can not get the id attribute!")
    }

    function S(e, o) {
        X = X || t(window.top.document.querySelector(".App"), !0);
        try {
            "/design/styles" == e && (e = "/design/site-styles"), e.indexOf("custom-css") > -1 && X.props.router && X.props.router.routes && X.props.router.routes.forEach(function(t) {
                t.path && t.path.indexOf("custom-css") > -1 && (e = t.path)
            }), X && X.props && X.props.router.history ? (X.props.router.redirectMap && X.props.router.redirectMap[e] && (e = X.props.router.redirectMap[e]), X.props.router.history.push(e), o && X.props.router.history.pushFrameUrl(o.replace("?url=", ""))) : X.router && X.router.push && X.router.push({
                pathname: e
            })
        } catch (t) {
            H.warn("Can't quick navigate to " + e, t)
        }
    }

    function C(e, t) {
        var o = ee && ee.get("contentBox") && ee.get("contentBox").one(".message");
        o && (t && !0 === t ? o.one("p:last-child").set("innerHTML", e) : t && t.length && o.one(t) ? o.one(t).set("innerHTML", e) : o.prepend("<p>" + e + "</p>"))
    }

    function _(e) {
        var t = e.dataset && e.dataset.collectionId,
            o = e.dataset && e.dataset.type,
            n = e.dataset && e.dataset.sort;
        try {
            var a = new Y.Squarespace.Widgets.Confirmation({
                position: function() {
                    return {
                        top: 90,
                        left: 22
                    }
                },
                className: "sort-items",
                showScreenOverlay: !0,
                "strings.title": "Reorder Collection",
                "strings.message": 'This will change your articles dates based on titles and you\'ll have A-Z or Z-A sorted Blog. <p style="color: red;font-weight:bold">You do this at your own risk, if understand - hit CONFIRM.</p>'
            });
            a.on("confirm", function() {
                ee = new Y.Squarespace.Widgets.Information({
                    "strings.title": "Reordering Collection",
                    className: "reorder-Info",
                    "strings.message": "Reordering items, changing publish dates.",
                    hideAfterTime: null,
                    "strings.confirm": "Reload Window.",
                    position: function() {
                        return {
                            top: 90,
                            left: 22
                        }
                    },
                    style: 2
                }), ee.on("confirm", function(e) {
                    te ? e.halt() : (ee.destroy(), ee = null, setTimeout(function() {
                        window.top.location.reload()
                    }, 1e3))
                }), C("Now requesting collection items.<br>May take long for big collections or colections with heavy items.<br/><b>Please wait...</b>"), p(t, o, !0).then(function(e) {
                    if (e) {
                        e.sort(function(e, t) {
                            return e = e.title || "", t = t.title || "", e = e.toLowerCase().replace(/\r?\n|\r/g, "").replace(/ /g, ""), t = t.toLowerCase().replace(/\r?\n|\r/g, "").replace(/ /g, ""), factor = e < t ? -1 : e > t ? 1 : 0, factor
                        });
                        var t = "A-Z";
                        "desc" == n && (e.reverse(), t = "Z-A");
                        var o = 1626521400050,
                            a = count_size = e.length;
                        H.log("Found " + a + " items"), C("Found " + a + " items in collection.<br/>Starting " + t + " sorting...<br/>"), C('<span class="items-left">' + a + " items of " + count_size + " left.</span>");
                        var r = !1,
                            i = function(e, t) {
                                var n = new window.top.Y.Squarespace.Models.ContentItem(e),
                                    i = n.get("publishOn"),
                                    s = o - 6e4 * t;
                                s !== i ? (n.set("publishOn", s), n.set("updatedOn", (new Date).getTime()), r = !0, C("<b>" + e.title + "</b> is updating...", !0), n.onceAfter("save", function() {
                                    a--, r = !1, C("<b>" + e.title + "</b> was updated.", !0), C(a + " items of " + count_size + " left.", ".items-left")
                                }), n.save()) : (a--, r = !1, C("<b>" + e.title + "</b> no need to be updated.", !0), C(a + " items of " + count_size + " left.", ".items-left"))
                            },
                            s = setInterval(function() {
                                var t = count_size - a;
                                count_size >= t && !r && e[t] && i(e[t], t), (0 == a || a < 0) && (clearInterval(s), s = null, r = !1, te = !1, C("<b>Sorting process finished with success, you may reload window.</b>"))
                            }, 50)
                    } else H.warn("No Items were fetched.")
                })
            })
        } catch (e) {}
    }

    function N(e) {
        if (e && e.target && e.target.className && e.target.className.length)
            if (e.target.className && e.target.className.indexOf("cf-init-filter-button") > -1) e.preventDefault(), h(e.target);
            else if (e.target.className.indexOf("cf-blog-sort") > -1) e.preventDefault(), _(e.target);
        else if (e.target.className.indexOf("button-custom-edit") > -1) e.preventDefault(), b(e.target);
        else if (e.target.className.indexOf("button-custom-delete") > -1) e.preventDefault(), y(e.target);
        else if (e.target.className.indexOf("quick-router-link") > -1) {
            if (e.preventDefault(), e.target.pathname)
                if (e.shiftKey) {
                    var t = window.top.confirm("Delete quick link " + e.target.pathname + e.target.search + " as " + e.target.textContent + " ?");
                    t && x(e.target.pathname + e.target.search, "", !0)
                } else S(e.target.pathname, e.target.search)
        } else if (e.target.className.indexOf("add-quick-link") > -1) {
            e.preventDefault();
            var o = window.top.location.pathname.replace("/config", ""),
                n = o.split("/"),
                a = window.top.document.querySelector(".incomingPanel .header>.title"),
                r = !1;
            if (3 == n.length && "pages" === n[n.length - 2] ? a && a.getAttribute("title") && (n = a.getAttribute("title")) : n = v(n[n.length - 1]), j = j || document.getElementById("sqs-site-frame"), j) try {
                r = j.contentWindow.Static.SQUARESPACE_CONTEXT.item || j.contentWindow.Static.SQUARESPACE_CONTEXT.collection, r && (n = r.title, o = r.fullUrl ? o + "?url=" + r.fullUrl : o)
            } catch (e) {
                H.log(e)
            }
            var i = window.top.prompt("Link title for " + o, n);
            i && x(o, i)
        }
    }

    function q(e) {
        var t = e && e.firstChild || window.top.document.querySelector(".sqs-damask-panel-content>div");
        e = e && e.classList && e.classList.contains("sqs-content-manager-base") && e || window.top && window.top.document && window.top.document.querySelector(".sqs-content-manager-base");
        try {
            window.top.Y && window.top.Y.use && window.top.Y.use("squarespace-content-manager-widgets-blog", function() {
                window.top.Y.Squarespace.ContentManagerWidgets && window.top.Y.Squarespace.ContentManagerWidgets.Blog && window.top.Y.Squarespace.ContentManagerWidgets.Blog.ATTRS && (window.top.Y.Squarespace.ContentManagerWidgets.Blog.ATTRS.fields.value = "addedOn,publishOn,categories,tags,author,title,urlId,fullUrl,collectionId,id,coverImageUrl,recordType,commentCount,workflowState,recordTypeLabel,updatedOn")
            })
        } catch (e) {
            H.log(e)
        }
        if (e) {
            if (!e.querySelector(".cf-init-filter-button")) {
                var o = document.createElement("div");
                o.className = "custom-w-buttons";
                var n = window.top.Y.Widget.getByNode(e);
                if (e.className.indexOf("sqs-content-manager-blog") > -1 && n && n.get("collection")) {
                    var a = n.get("collection"),
                        r = document.createElement("div");
                    o.innerHTML += '<button class="cf-blog-sort custom-w-button cf-blog-sort-asc" title="Sort A-Z based" data-sort="asc" data-collection-id="' + a.get("id") + '" data-url="' + a.get("fullUrl") + '" data-type="' + a.get("typeName") + '">Sort A-Z</button><button class="cf-blog-sort custom-w-button cf-blog-sort-desc" title="Sort Z-A" data-sort="desc" data-collection-id="' + a.get("id") + '" data-url="' + a.get("fullUrl") + '" data-type="' + a.get("typeName") + '">Sort Z-A</button>', t.parentNode.parentNode.appendChild(r)
                }
                o.innerHTML += '<button class="cf-init-filter-button custom-w-button" title="Filter">Filter</button>', e.appendChild(o), e.classList.add("custom-filtering-appended")
            }
        } else if (t) {
            var i = window.top.location.pathname.indexOf("/config/pages/") > -1 && window.top.location.pathname.split("/config/pages/")[1].split("/")[0];
            i && i.length > 22 && -1 == i.indexOf("/") && (t.parentNode.querySelector(".cf-init-filter-button") || B(i).then(function(e) {
                if (e && e.typeName && !t.parentNode.querySelector(".cf-init-filter-button")) {
                    var o = document.createElement("div");
                    if (o.className = "custom-w-buttons", e.typeName.indexOf("blog-") > -1) {
                        var n = document.createElement("div");
                        o.innerHTML += '<button class="cf-blog-sort custom-w-button cf-blog-sort-asc" title="Sort A-Z based" data-sort="asc" data-collection-id="' + e.id + '" data-url="' + e.fullUrl + '" data-type="' + e.typeName + '">Sort A-Z</button><button class="cf-blog-sort custom-w-button cf-blog-sort-desc" title="Sort Z-A" data-sort="desc" data-collection-id="' + e.id + '" data-url="' + e.fullUrl + '" data-type="' + e.typeName + '">Sort Z-A</button>', t.parentNode.appendChild(n)
                    }
                    o.innerHTML += '<button class="cf-init-filter-button custom-w-button" title="Filter" data-button="new" data-collection-id="' + e.id + '" data-url="' + e.fullUrl + '" data-type="' + e.typeName + '">Filter</button>', t.parentNode.appendChild(o), t.parentNode.classList.add("custom-filtering-appended")
                }
            }))
        }
    }

    function x(e, t, o) {
        var n = k();
        o ? n[e] && delete n[e] : n[e] = t;
        try {
            window.top.localStorage.setItem("UITweaksQuickLinks", JSON.stringify(n));
            var a = window.top.document.querySelector(".quickLinks");
            a && (a.parentNode.removeChild(a), T())
        } catch (e) {
            H.log(e)
        }
    }

    function k() {
        var e = {
                "/pages": "Pages",
                "/settings/advanced/code-injection": "Injections",
                "/design/custom-css": "Custom CSS",
                "/design/site-styles": "Site Styles"
            },
            t = window.top.localStorage.getItem("UITweaksQuickLinks");
        if (!(t && t.length > 3)) return e;
        try {
            return t = JSON.parse(t), t
        } catch (t) {
            return H.log(t), e
        }
    }

    function O() {
        var e = window.top.document.body.querySelector('[class*="Toolbar-alignmentSection-"][class*="Toolbar-right-"]'),
            t = window.top.document.body.querySelector(".App-siteFrame #frame-toolbar-desktop button[aria-controls] svg");
        if (!e && t && (e = t.closest('div[role="tablist"]')), e && !e.querySelector(".tablet-icon-wrapper")) {
            e.parentNode.style.width = "132px";
            var o = window.top.document.createElement("div");
            o.className = "Toolbar-iconButtonWrapper tablet-icon-wrapper", o.innerHTML = '<button class="IconButton-button tablet-button"></button><div style="display:none" class="button-descr">Tablet View</div>', e.prepend(o);
            var n = window.top.document.createElement("div");
            n.className = "Toolbar-iconButtonWrapper tablet-icon-wrapper", n.innerHTML = '<button class="IconButton-button tablet-button-landscape"></button><div style="display:none" class="button-descr">Tablet Landscape View</div>', e.prepend(n);
            var a = null,
                r = null,
                i = function() {
                    a && ("false" == a.ariaSelected && a.click(), a.style.color = "rgb(110, 110, 110)", a.style.backgroundColor = "#f0f0f0"), r && (r.style.color = "rgb(110, 110, 110)", r.style.backgroundColor = "#f0f0f0")
                };
            window.top.document.body.addEventListener("click", function(e) {
                var t = "BUTTON" !== e.target.nodeName && e.target.closest("button") ? e.target.closest("button") : e.target;
                t && (t.className && t.className.indexOf || "BUTTON" == t.nodeName && t.ariaSelected) && ((t.className.indexOf("tablet-button") > -1 || "BUTTON" == t.nodeName && ("desktop" == t.value || "phone" == t.value)) && (a = window.top.document.body.querySelector('.App-siteFrame button[aria-controls="desktop-tab"]'), r = window.top.document.body.querySelector('.App-siteFrame button[aria-controls="phone-tab"]')), t.className.indexOf("tablet-button-landscape") > -1 ? (i(), window.top.document.body.classList.add("tablet-landscape-preview-activated"), window.top.document.body.classList.remove("tablet-preview-activated")) : t.className.indexOf("tablet-button") > -1 ? (i(), window.top.document.body.classList.add("tablet-preview-activated"), window.top.document.body.classList.remove("tablet-landscape-preview-activated")) : "BUTTON" != t.nodeName || "desktop" != t.value && "phone" != t.value || (window.top.document.body.classList.remove("tablet-preview-activated"), window.top.document.body.classList.remove("tablet-landscape-preview-activated"), a && (a.style.backgroundColor = "transparent", a.style.color = ""), r && (r.style.backgroundColor = "transparent", r.style.color = "")))
            })
        }
    }

    function T(e) {
        var t = window.top.document.body;
        if (t && !t.querySelector(".quickLinks")) {
            var o = window.top.document.createElement("div"),
                n = k();
            n;
            var a = "";
            for (var r in n) n.hasOwnProperty(r) && (a += '<a class="quick-router-link" href="' + r + '">' + n[r] + "</a>");
            o.innerHTML = a, o.className = "quickLinks", o.style = "opacity:0;pointer-events:none;transition:opacity .3s", o.innerHTML = o.innerHTML + '<a href="#" class="add-quick-link">âž•</a>', t.appendChild(o)
        }
    }

    function E(e) {
        var t = e.appUrl.replace("/config", ""),
            o = e.frameUrl,
            n = window.top.document.querySelector(".quickLinks");
        if (n) {
            var a = n.querySelectorAll(".quick-router-link");
            a.length && a.forEach(function(e) {
                var n = o && t.indexOf("/pages") > -1 ? "/pages" == e.pathname && !e.search || e.search.replace("?url=", "") == o : e.pathname == t;
                n ? e.classList.add("active") : e.classList.remove("active")
            })
        } else H.log("Quick links not built")
    }

    function P() {
        X = X || t(window.top.document.querySelector(".App"), !0);
        try {
            var e = o(function(e) {
                e && e.state && A(e.state)
            }, 100, !1);
            X && X.props ? (X.props.router.history.listen(e), A(X.props.location.state), K = !0) : X || A({
                appUrl: window.top.location.pathname
            })
        } catch (e) {
            H.log(e)
        }
    }

    function A(e) {
        E(e), e.appUrl && (window.top.document.documentElement.dataset.appUrl = e.appUrl)
    }

    function L(e) {
        e = e || window.top.document;
        var t = e.querySelector('[class*="SiteStyles-container-"]');
        if (t && !t.querySelector(".position-select")) {
            H.log("No Position select");
            var o = window.top.document.createElement("a");
            o.className = "position-select", o.title = "Change Styles panel position";
            var n = t.querySelector('[class*="Header-title-"]');
            n && (n.appendChild(o), o.addEventListener("click", function(e) {
                e.preventDefault(), window.top.document.documentElement.classList.toggle("StylesPanelPositionLeft"), window.top.document.documentElement.classList.contains("StylesPanelPositionLeft") ? localStorage.setItem("StylesPanelPositionLeft", !0) : localStorage.removeItem("StylesPanelPositionLeft")
            }))
        }
    }

    function I(e) {
        e.halt(), e.stopImmediatePropagation();
        var t = {
            container: ".sqs-order-list",
            items: ".sqs-order",
            index: 0,
            settings: {
                requestAttrWithAjax: !1,
                align: "space-between",
                mobilePanel: {
                    enabled: !1
                },
                clearAllButton: {
                    enabled: !0,
                    text: "Clear All",
                    place: "before"
                },
                hooks: {
                    beforeInit: function(e) {
                        e.coll_data = {
                            collection: {
                                id: collectionId
                            },
                            items: items
                        }
                    },
                    afterFilter: function(e) {
                        e.itemsParent.all("[data-first-upcoming],[data-first-past]").removeAttribute("data-first-upcoming").removeAttribute("data-first-past");
                        var t = e.itemsParent.one(".status-upcoming"),
                            o = e.itemsParent.one(".status-past");
                        t && t.setAttribute("data-first-upcoming", "true"), o && o.setAttribute("data-first-past", "true")
                    }
                },
                useSQSProxy: {
                    enabled: !1
                },
                updateFilterOptions: {
                    enabled: !1,
                    nonExistOptions: {
                        hide: !1,
                        disable: !1,
                        disableHard: !0
                    },
                    showOptionsCounters: !0,
                    optionsCounterWrap: "- ()"
                },
                pagination: {
                    enabled: !0,
                    pageSize: 20,
                    margin: "12px 0",
                    padding: "0",
                    align: "center",
                    pagesRange: 2,
                    pagesAround: 1,
                    showPrevNext: {
                        enabled: !0,
                        hideItems: !1,
                        next: "Next",
                        prev: "Prev"
                    },
                    items: {
                        style: "square",
                        width: "24px",
                        margin: "8px",
                        borderWidth: "1px",
                        backgroundColor: "#fff",
                        activeBackgroundColor: "#555",
                        color: "#000",
                        activeColor: "#fff"
                    }
                },
                simpleFilter: {
                    show: {
                        effect: "fade",
                        transitionDuration: 200,
                        stagger: 30
                    },
                    hide: {
                        effect: "fade",
                        transitionDuration: 50,
                        stagger: 18
                    }
                },
                search: {
                    text: "Search Titles",
                    positionOrder: 1
                },
                filter: {
                    cacheOptions: !1,
                    category: !1,
                    tag: !1,
                    items: [{
                        name: "Category",
                        multiple: !0,
                        multipleLogic: "and",
                        logic: "and",
                        getAttr: "categories"
                    }, {
                        name: "Tags",
                        multiple: !0,
                        multipleLogic: "and",
                        logic: "and",
                        getAttr: "tags"
                    }, {
                        name: "Status",
                        options: ["Upcoming", "Past", "Published", "Draft", "Needs Review", "Scheduled"],
                        allowedOptions: ["Upcoming", "Past", "Published", "Draft", "Needs Review", "Scheduled"],
                        multiple: !0,
                        sort: "asAllowed",
                        getAttr: function(e) {
                            return e.getAttribute("data-status").split(",")
                        }
                    }]
                },
                sort: {
                    enabled: !0,
                    items: [{
                        name: "Price",
                        order: "asc|desc",
                        orderTexts: "$-$$$|$$$-$"
                    }, {
                        name: "A-Z",
                        showOrder: !1,
                        sort: "[data-title]",
                        order: "asc"
                    }, {
                        name: "Z-A",
                        showOrder: !1,
                        sort: "[data-title]",
                        order: "desc"
                    }, {
                        name: "Older",
                        showOrder: !1,
                        sort: "[data-date]",
                        order: "asc"
                    }, {
                        name: "Newer",
                        showOrder: !1,
                        sort: "[data-date]",
                        order: "desc"
                    }]
                }
            }
        };
        window.top.CustomSQSFilter ? (filterContainer.customFilter = new window.top.CustomSQSFilter(filterContainer, t), window.top.Y.one(container).addClass("cf-active"), filterContainer.customFilter.addVirtualItems(items_list), filterContainer.customFilter.items = filterContainer.customFilter.virtual_list, filterContainer.customFilter._sortGrid(), checkPositionFunction()) : r("https://assets.squarewebsites.org/custom-filter/custom-filter.min.js", "custom-filter-script", window.top.document.head, function() {
            filterContainer.customFilter = new window.top.CustomSQSFilter(filterContainer, t), window.top.Y.one(container).addClass("cf-active"), filterContainer.customFilter.addVirtualItems(items_list), filterContainer.customFilter.items = items_list, filterContainer.customFilter._sortGrid(), checkPositionFunction()
        })
    }

    function D(e) {
        e = e || window.top.Y && window.top.Y.one && window.top.Y.one(".sqs-order-list-manager-content");
        var t = window.top.Y && window.top.Y.one && window.top.Y.one(".header-action-buttons");
        t && !t.one(".filter-button") && (t.append('<div class="action-button filter-button" style="background-color: #e4e4e4;padding: 0 16.5px;margin: 0 0 0 11px" data-name="filterButton">Filter</div>'), t.one(".filter-button").on("click", I))
    }

    function F(e) {
        var o = t(e);
        if (o && !e.addedGalleryIcon && (o.stateNode && o.stateNode.props && o.stateNode.props.iconConfigs || o.pendingProps && o.pendingProps.iconConfigs)) o.stateNode && o.stateNode.props && o.stateNode.props.iconConfigs[8] ? (o.stateNode.props.categories && o.stateNode.props.categories[0] && -1 == o.stateNode.props.categories[0].items.indexOf(8) && (o.stateNode.props.categories[0].items.splice(o.stateNode.props.categories[0].items.indexOf(5) + 1, 0, 8), e.addedGalleryIcon = !0), o.stateNode.updater && o.stateNode.updater.enqueueForceUpdate && o.stateNode.updater.enqueueForceUpdate(o.stateNode)) : o && o.pendingProps && o.pendingProps.iconConfigs[8] && (o.pendingProps.categories && o.pendingProps.categories[0] && -1 == o.pendingProps.categories[0].items.indexOf(8) && (o.pendingProps.categories[0].items.splice(o.pendingProps.categories[0].items.indexOf(5) + 1, 0, 8), e.addedGalleryIcon = !0), o.updater && o.updater.enqueueForceUpdate && o.updater.enqueueForceUpdate(o));
        else if (o && o.child && o.child.pendingProps && o.child.pendingProps.blockCategory && "BASIC" == o.child.pendingProps.blockCategory.groupType && o.child.pendingProps.blockCategory.items && -1 == o.child.pendingProps.blockCategory.items.indexOf(8)) return o.child.pendingProps.blockCategory.items.splice(o.child.pendingProps.blockCategory.items.indexOf(5) + 1, 0, 8), !0
    }

    function M(e, t) {
        var o = e.document.body;
        if (!e.__ui_tweaks_observer && o) {
            var n = function(e) {
                e.forEach(function(e) {
                    if (e.target && (e.target.className && e.target.className.indexOf && e.target.className.indexOf("react-block-selector-overlay") > -1 || (e.target.className && e.target.className.indexOf && e.target.className.indexOf("sqs-layout-insert-block-menu") > -1 ? F(e.target) : e.target.dataset && "insert-block-menu" == e.target.dataset.test && F(e.target))), e.type, "childList" == e.type && e.addedNodes[0]) {
                        if (e.target.className && e.target.className.indexOf && e.target.className.indexOf("SiteStyles-container-") > -1 && H.log("Site Styles", e.target), e.target.classList && e.target.classList.contains("CodeMirror") && e.target.CodeMirror && e.target.CodeMirror._handlers && e.target.CodeMirror._handlers.blur && e.target.CodeMirror._handlers.blur.length && e.target.CodeMirror._handlers.blur[1] && !e.target.CodeMirror.__blurDisabled && (e.target.CodeMirror._handlers.blur[1] = function() {
                                return !1
                            }, e.target.CodeMirror.__blurDisabled = !0), e.target.className && e.target.className.indexOf && e.target.className.indexOf("sqs-content-manager-base") > -1 && q(e.target), e.target.className && e.target.className.indexOf && e.target.className.indexOf("sqs-damask-panel-content") > -1 && q(e.target), e.target.className && e.target.className.indexOf && e.target.className.indexOf("sqs-order-list-manager-content") > -1 && D(e.target), e.addedNodes[0].dataset && e.addedNodes[0].dataset.modalId) d(e.addedNodes[0]);
                        else if (e.addedNodes[0].querySelector) {
                            var t = e.addedNodes[0].querySelector('[class*="JSFNavModal-dialog-"]') || e.addedNodes[0].querySelector("div[data-modal-id]");
                            t && d(t)
                        }
                    } else if ("attributes" == e.type && e.target && e.target.className && e.target.className.indexOf) {
                        if (e.target.className.indexOf("DeviceViewFrame-desktop-phone-") > -1) try {
                            window.top.document.body.classList.remove("tablet-landscape-preview-activated"), window.top.document.body.classList.remove("tablet-preview-activated")
                        } catch (e) {
                            H.log(e)
                        }
                        if (e.target.className.indexOf("react-first") > -1) try {
                            L(e.target)
                        } catch (e) {
                            H.log(e)
                        }
                    }
                })
            };
            e.__ui_tweaks_observer = new MutationObserver(n), e.__ui_tweaks_observer.observe(o, {
                childList: !0,
                subtree: !0,
                attributes: !0
            }), e.__getObserverInterval || (e.__getObserverInterval = e.setInterval(function() {
                var e = document.querySelector(".sqs-layout-insert-block-menu-content section section");
                if (e) {
                    var t = F(e);
                    t && H.log("Added Gallery")
                }
            }, 550))
        }
    }

    function U(e) {
        try {
            e && (e.Y.Squarespace.Layout.InsertBlockMenuSection = e.Y.Squarespace.Layout.InsertBlockMenuWebApp), H.log("Section Menu to Web App")
        } catch (e) {
            H.log(e)
        }
    }

    function B(e) {
        return new Promise(function(t) {
            e && Y.Squarespace && Y.Squarespace.ContentCollectionCache && Y.Squarespace.ContentCollectionCache.getById ? t(Y.Squarespace.ContentCollectionCache.getById(e).toJSON()) : (H.log("Can not return collection by id: " + e), t(!1))
        })
    }

    function W() {
        try {
            Y.Squarespace && Y.Squarespace.Block.ModelEditorDialog.SummaryV2 && (H.log("Extending Get Summary Collection Id"), Y.Squarespace.Block.ModelEditorDialog.SummaryV2.prototype._getCollectionId = function() {
                var e = this.get("model").get("collectionId") || "";
                return e && Y.Squarespace && Y.Squarespace.ContentCollectionCache && Y.Squarespace.ContentCollectionCache.getById && (Y.Squarespace.ContentCollectionCache.getById(e) || (e = "")), e
            })
        } catch (e) {
            H.warn(e)
        }
    }

    function R(a) {
        if (H.log("UI Tweaks Loaded"), a.document && a.document.documentElement.classList.add("ui-theme-modern"), n(Q, z, a.document.querySelectorAll("head")[0]), a.removeEventListener("DOMContentLoaded", R, !1), a.Squarespace.onInitialize(a.Y, function() {
                if (a.Y && a.Y.Global && !a.top.__modern_theme_dialog_Listener) {
                    a.top.__modern_theme_dialog_Listener = a.top.Y.Global.after("EditingDialog:show", function(t) {
                        try {
                            var o = t.currentTarget,
                                n = o.getName && o.getName();
                            o.after("rendered", function(t) {
                                o.currentTab && o.currentTab.name && o.el && o.el._node && o.el._node.setAttribute("data-tab-shown", o.currentTab.name), o.titleEl && (o.titleEl.append('<button class="expand-button"></button>'), o.titleEl.one(".expand-button").on("click", function(t) {
                                    t.preventDefault(), o.el && o.el.toggleClass("dialog-expanded"), e()
                                }));
                                try {
                                    n = o.getName && o.getName() || "";
                                    var a = o.fields && (o.fields.categories || o.fields.tags);
                                    if (a ? o.el && o.el._node && o.el._node.classList.add("some-item-editor-dialog") : o.el && o.el._node && (o.el._node.classList.remove("some-item-editor-dialog"), o.el._node.classList.add("dialog-name-" + n.replace(/ /g, "-"))), o.fields) try {
                                        Object.values(o.fields).forEach(function(e) {
                                            e.name && "wysiwyg" === e.name ? i(e) : e.name && "text" === e.name && "title" === e.getName() ? s(e) : e.name && "slider" === e.name && "pageSize" === e.getName() ? "Number of Items" !== e.get("strings.title") && e.slider && e.slider.set("max", 250) : e.name && e.name.indexOf("FileImage")
                                        })
                                    } catch (t) {
                                        H.log(t)
                                    }
                                } catch (t) {
                                    H.warn("Modern Theme: ", t)
                                }
                            }), o.after("tab-shown", function(t) {
                                var n = t.name || "";
                                o.el && o.el._node && o.el._node.setAttribute("data-tab-shown", n), setTimeout(function() {
                                    try {
                                        t.target.currentTab.tabPanelObj.all(".u-field-textarea").each(function(e) {
                                            if (e.get("parentNode") && e.get("parentNode")._node.className.indexOf("hasCharCount") > -1) {
                                                var t = e.ancestor('[class*="SEOContentCollectionTab-field"]');
                                                if (t) {
                                                    var o = t.one(".u-field-label"),
                                                        n = '<br/><span class="google_recommends">Google recommends 70 chars for title.</span>';
                                                    o && !o.one(".google_recommends") && (o._node.innerText.indexOf("Description") > -1 && (n = '<br/><span class="google_recommends">Google recommends 155 chars for description.</span>'), o.append(n))
                                                }
                                                s(e)
                                            }
                                        })
                                    } catch (e) {
                                        H.log(e)
                                    }
                                    e()
                                }, 800)
                            })
                        } catch (e) {
                            H.log(e)
                        }
                    });
                    try {
                        var t = a.top.Y.Squarespace.Animations.Flyout.prototype.show;
                        a.top.Y.Squarespace.Animations.Flyout.prototype.show = function() {
                            var e = this.get("host");
                            this.get("node");
                            e.ancestor(".sqs-stringset") && this._mask.addClass("cat-or-tag-flyout"), t.apply(this, arguments)
                        }
                    } catch (e) {
                        H.log(e)
                    }
                    H.log("Modern Theme started")
                }
                W(), q(), D(), U(a);
                try {
                    var o = window.top.Y.Squarespace && window.top.Y.Squarespace.ContentItemEditor && window.top.Y.Squarespace.ContentItemEditor.ProductPhysical && window.top.Y.Squarespace.ContentItemEditor.ProductPhysical.ATTRS.editorConfiguration.value.tabs;
                    if (o && -1 == JSON.stringify(o).indexOf("tabs.location") && o.push({
                            $include: "tabs.location"
                        }), o) {
                        var n = window.top.Y.Squarespace.ContentItemEditor.ProductService.ATTRS.editorConfiguration.value.tabs;
                        n && -1 == JSON.stringify(n).indexOf("tabs.location") && n.push({
                            $include: "tabs.location"
                        });
                        var r = window.top.Y.Squarespace.ContentItemEditor.ProductDigital.ATTRS.editorConfiguration.value.tabs;
                        r && -1 == JSON.stringify(r).indexOf("tabs.location") && r.push({
                            $include: "tabs.location"
                        })
                    }
                } catch (e) {
                    H.log(e)
                }
            }), q(), D(), O(), M(a, !0), !K) {
            X = t(window.top.document.querySelector(".App"), !0);
            var r = o(function(e) {
                e && e.state && A(e.state)
            }, 100, !1);
            X && X.props && (X.props.router.history.listen(r), A(X.props.location.state), K = !0)
        }
        var l = window.top.document.querySelector(".preview-viewport");
        l && (l.parentNode.dataset.class = "DeviceViewFrame")
    }

    function V(e) {
        var t = e.key;
        switch (t) {
            case "ArrowUp":
                Z = Z || e.target.querySelector('[class*="JSFNavModal-dialog-"]'), Z && e.target.contains(Z) && (e.preventDefault(), l(Z, "up"));
                break;
            case "ArrowDown":
                Z = Z || e.target.querySelector('[class*="JSFNavModal-dialog-"]'), Z && e.target.contains(Z) && (e.preventDefault(), l(Z, "down"))
        }
    }

    function $() {
        return new Promise(function(e) {
            var t = window.setInterval(function() {
                var o = window.top.document.getElementById("sqs-site-frame");
                if (o) return window.clearInterval(t), e(o)
            }, 100)
        })
    }
    var H = window.console,
        Q = "https://assets.squarewebsites.org/sqstools-ext/themes/modern.min.css",
        z = "sqstp-UI-theme",
        Z = null,
        G = {
            1: "Published",
            2: "Scheduled",
            3: "Needs Review",
            4: "Draft",
            5: "Private",
            6: "Deleted"
        },
        J = {
            1: "Physical",
            2: "Digital",
            3: "Service",
            4: "GiftCard",
            5: "Paywall",
            6: "CustomSale"
        },
        j = window.top.document.getElementById("sqs-site-frame"),
        X = t(window.top.document.querySelector(".App"), !0),
        K = !1,
        ee = (document.body.getAttribute("data-sqs-tools-id") && document.body.getAttribute("data-sqs-tools-extension-inited"), window.Static && window.Static.SQUARESPACE_CONTEXT && window.Static.SQUARESPACE_CONTEXT.templateVersion, null),
        te = !0;
    if (Element.prototype.f_matches || (Element.prototype.f_matches = Element.prototype.matchesSelector || Element.prototype.mozMatchesSelector || Element.prototype.msMatchesSelector || Element.prototype.oMatchesSelector || Element.prototype.webkitMatchesSelector || function(e) {
            var t = this.parentElement || this.parentNode;
            t || (t = document.createDocumentFragment(), t.appendChild(this));
            for (var o = t.querySelectorAll(e), n = o.length; --n >= 0 && o.item(n) !== this;);
            return n > -1
        }), window.top.Static && window.top.Static.IN_BACKEND) {
        var oe = window.top.document.querySelectorAll("head")[0];
        window.top.document.documentElement.classList.add("ui-theme-modern"), oe && n(Q, z, oe), localStorage.getItem("StylesPanelPositionLeft") && window.top.document.documentElement.classList.add("StylesPanelPositionLeft"), window.top.Static.SQUARESPACE_CONTEXT.templateVersion && window.top.Static.SQUARESPACE_CONTEXT.templateVersion, T(), P(), L(), window.top.__ui_tweaks_observer && (window.top.__ui_tweaks_observer.disconnect(), window.top.__ui_tweaks_observer = null), window.top.__ui_tweaks_arrows_listener && (window.top.document.removeEventListener("keydown", window.top.__ui_tweaks_arrows_listener, !0), window.top.__ui_tweaks_arrows_listener = null), window.top.__ui_tweaks_filter_click_listener && (window.top.document.removeEventListener("click", window.top.__ui_tweaks_filter_click_listener, !0), window.top.__ui_tweaks_filter_click_listener = null), window.top.__ui_tweaks_arrows_listener = V, window.top.__ui_tweaks_filter_click_listener = N, window.top.document.addEventListener("keydown", window.top.__ui_tweaks_arrows_listener, !0), window.top.document.addEventListener("click", window.top.__ui_tweaks_filter_click_listener, !0), M(window.top);
        j = window.top.document.getElementById("sqs-site-frame");
        var ne = function() {
            j && (j.contentWindow.Squarespace && j.contentWindow.Squarespace.onInitialize && j.contentWindow.Y && j.contentWindow.Y.win ? R(j.contentWindow) : j.addEventListener("load", function() {
                setTimeout(function() {
                    R(j.contentWindow)
                }, 300)
            }))
        };
        j ? ne() : $().then(function(e) {
            j = e, ne()
        })
    }
    window.top.__msg && window.top.__msg.log && (H = window.top.__msg)
}();