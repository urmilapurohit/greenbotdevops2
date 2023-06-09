function initializeListSearch(e) {
    return void 0 === e || null === e ? void setDefaultValues() : (toggleAnimationSpeed = "undefined" != typeof e.toggleAnimationSpeed ? e.toggleAnimationSpeed : 250, cssActiveClass = "undefined" != typeof e.cssActiveClass ? e.cssActiveClass : "active", itemSelector = "undefined" != typeof e.itemSelector ? e.itemSelector : ".collection-item", openLinkWithEnterKey = "undefined" != typeof e.openLinkWithEnterKey && e.openLinkWithEnterKey, searchTextBoxSelector = "undefined" != typeof e.searchTextBoxSelector ? e.searchTextBoxSelector : "#search-box", void (noItemsFoundSelector = "undefined" != typeof e.noItemsFoundSelector ? e.noItemsFoundSelector : ".no-apps-found"))
}

function setDefaultValues() {
    toggleAnimationSpeed = 250, itemSelector = ".collection-item", cssActiveClass = "active", openLinkWithEnterKey = !1, searchTextBoxSelector = "#search-box", noItemsFoundSelector = ".no-apps-found"
}

function searchListItems(e) {
    return "" === e ? (resetSearch(), void $(noItemsFoundSelector).hide()) : (foundItems = findItemsInList(e), void (foundItems.length > 0 && openLinkWithEnterKey ? (foundItems[0].addClass(cssActiveClass), $(noItemsFoundSelector).hide()) : $(noItemsFoundSelector).show()))
}

function resetSearch() {
    $(itemSelector).slideDown(toggleAnimationSpeed),
    $(itemSelector).removeClass(cssActiveClass),
    foundItems = $(itemSelector),
    $('.panel-collapse').removeClass('in'),
    $('.panel-collapse').attr('aria-expanded', 'false'),
    $('.panel-heading a').addClass('collapsed')
}


function findItemsInList(e) {
    //for (var t = $(itemSelector), s = [], o = 0; o < t.length; o++)
    //{
    //    var n = t[o];
    //    $(n).removeClass(cssActiveClass), $(n).children("a").html().toLowerCase().indexOf(e.toLowerCase()) < 0 ? $(n).slideUp(toggleAnimationSpeed) : (s.push($(n)), $(n).slideDown(toggleAnimationSpeed))
    //}
    //return s
    $('.panel-collapse').removeClass('in');
    $('.panel-collapse').attr('aria-expanded', 'false');
    $('.panel-heading a').addClass('collapsed');
    for (var t = $(itemSelector), s = [], o = 0; o < t.length; o++) {
        var n = t[o];
        $(n).removeClass(cssActiveClass),
        $(n).children("a").html().toLowerCase().indexOf(e.toLowerCase()) < 0 ? $(n).slideUp(toggleAnimationSpeed) : (s.push($(n)), $(n).slideDown(toggleAnimationSpeed), $(n).parents('.panel-collapse').addClass('in'), $(n).parents('.panel-collapse').attr('aria-expanded', 'true'), $(n).parents('.panel-collapse').removeAttr('style'))
    }
    $('.panel-collapse.in').closest('.panel').parent().find('.panel-heading a').removeClass('collapsed');
    return s
}

function selectNextItem(e) {
    if (openLinkWithEnterKey) { var t = $(itemSelector + "." + cssActiveClass); if (0 === t.length) "next" === e && $(foundItems[0]).addClass(cssActiveClass), "prev" === e && $(foundItems[foundItems.length - 1]).addClass(cssActiveClass); else { var s = $(itemSelector + "." + cssActiveClass); s.removeClass(cssActiveClass), "next" === e && s.nextAll(itemSelector + ":visible").first().addClass(cssActiveClass), "prev" === e && s.prevAll(itemSelector + ":visible").first().addClass(cssActiveClass) } }
}

function openLink() {
    if (openLinkWithEnterKey) {
        var e = $(itemSelector + "." + cssActiveClass).first().children("a").attr("href"); void 0 === e && null !== e || (document.location.href = e)
    }
}

var toggleAnimationSpeed, itemSelector, foundItems, cssActiveClass, openLinkWithEnterKey, searchTextBoxSelector, noItemsFoundSelector;

$(document).ready(function () {
    resetSearch(), $(searchTextBoxSelector).bind("input propertychange", function () { searchListItems($(this).val()) }), $(searchTextBoxSelector).keydown(function (e) { 40 === e.keyCode && selectNextItem("next"), 38 === e.keyCode && selectNextItem("prev"), 13 === e.keyCode && openLink() })
});