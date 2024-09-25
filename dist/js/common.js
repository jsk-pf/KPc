"use strict";

var _this = void 0;
/*
 = Common
*/

// + openUserControl
var openUserControl = function openUserControl() {
  $('.btn-open-usercontrol').on('click', function () {
    $('.user-control').toggleClass('on');
  });
};

// + selectedTabList
var selectedTabList = function selectedTabList() {
  $('.tab-event > li > a').on('click', function (e) {
    var target = $(e.currentTarget),
      tabList = target.closest('.co-tab-list'),
      tabControl = target.attr('id'),
      tabContList = $(".tab-content[aria-labelledby=".concat(tabControl, "]")).closest('.tab-cont-wrap');
    tabList.find(' > li > a').removeClass('on').attr('aria-selected', 'false');
    target.addClass('on').attr('aria-selected', 'true');
    tabContList.find('.tab-content').removeClass('on').attr('tabindex', -1);
    $(".tab-content[aria-labelledby=".concat(tabControl, "]")).addClass('on').attr('tabindex', 0);
  });
};

// + contentsMinHeight IE Control
var minHeightControl = function minHeightControl() {
  if ($('.content-wrapper .contents-wrap').length > 0) {
    $(window).on('load resize', function () {
      var contentsWrapHeight = $('.content-wrapper').outerHeight(),
        footerHeight = $('footer.footer').outerHeight(),
        contentMinHeight = contentsWrapHeight - footerHeight;
      $('.contents-wrap').css('min-height', contentMinHeight);
    });
  }
};

// =  toggleAccordion
var toggleAccordion = function toggleAccordion() {
  $('.co-accrodion-list').on('click', 'a.btn-accrodion', function (e) {
    e.preventDefault();
    var target = $(e.currentTarget),
      accordionBox = target.closest('.co-accordion'),
      accordionPanel = target.next('.accrodion-panel');
    if (accordionBox.hasClass('on') && accordionPanel.is(':visible')) {
      accordionBox.removeClass('on').find('.is-blind').text('접기');
      accordionPanel.stop().slideUp(350);
    } else {
      accordionBox.addClass('on').find('.is-blind').text('펼치기');
      accordionPanel.stop().slideDown(350);
    }
  });
};

// + goToTop
var goToTop = function goToTop() {
  $('.btn-go-top').on('click', function () {
    $('html, body').stop().animate({
      scrollTop: '0'
    }, 500);
  });
};

/*
	= Main
*/
// + MainContSideNav
var mainContSideNav = function mainContSideNav() {
  var mainContentsArea = $('.main-container').find('.main-contents-area .container').innerHeight(),
    headerHeight = $('.header').outerHeight() + 20,
    mainContSideNav = $('.main-container').find('.checkup-sidebar');
  mainContSideNav.css('max-height', mainContentsArea + headerHeight);
};

// + rollingTxtBanner
var $nowFirstRow = null,
  rollingTxtList = null,
  duration = 1000,
  $rollingListCnt = $('.rolling-banner').children('.list').children('li').length;

// +  Auto Rolling
var rollingAuto = function rollingAuto() {
  setInterval(function () {
    rollingTxtList = $('.rolling-banner > .list');
    $nowFirstRow = rollingTxtList.children('li:first-child');
    var listRow = function listRow() {
      $nowFirstRow.appendTo(rollingTxtList).show(400);
    };
    $nowFirstRow.hide(1000, listRow);
  }, 2000);
};

// + rolling banner txt
var rollingTxtBanner = function rollingTxtBanner() {
  if ($rollingListCnt <= 1) {
    return 0;
  } else {
    rollingAuto();
  }
  var $rollingPrevbtn = $('.rolling-banner').find('.prev-btn'),
    $rollingNextbtn = $('.rolling-banner').find('.next-btn');

  // Prev Btn
  $rollingPrevbtn.on('click', function () {
    if ($rollingListCnt <= 1) {
      return 0;
    } else {
      clearInterval(rollingAuto);
      rollingTxtList = $('.rolling-banner > .list');
      $nowFirstRow = rollingTxtList.children('li:last-child');
      var listRow = function listRow() {
        $nowFirstRow.prependTo(rollingTxtList).show(duration);
      };
      $nowFirstRow.hide(duration, listRow);
    }
  });

  // Next Btn
  $rollingNextbtn.on('click', function () {
    if ($rollingListCnt <= 1) {
      return 0;
    } else {
      clearInterval(rollingAuto);
      rollingTxtList = $('.rolling-banner > .list');
      $nowFirstRow = rollingTxtList.children('li:first-child');
      var listRow = function listRow() {
        $nowFirstRow.appendTo(rollingTxtList).show(duration);
      };
      $nowFirstRow.hide(duration, listRow);
    }
  });
};

// # Menu Toggle hamburger
// + btn-sidenav-toggle
var mainCont = document.querySelector('#container');
var btnSideMenuToggle = document.querySelector('.btn-sidenav-toggle');
var titMenu = document.querySelectorAll('.s-menu');

// if (mainCont.contains(btnSideMenuToggle)) {
//   btnSideMenuToggle.addEventListener('click', function () {
//     if (!mainCont.classList.contains('is-active')) {
//       mainCont.classList.add('is-active');
//       titMenu.forEach((item) => {
//         item.classList.add('is-blind');
//       });
//       document.querySelectorAll('.sidebar-menu > li > a').forEach((e) => {
//         e.classList.remove('on');
//       });
//       document.querySelectorAll('.sidebar-sub-menu').forEach((e) => {
//         e.style.display = 'none';
//       });
//     } else {
//       mainCont.classList.remove('is-active');
//       titMenu.forEach((item) => {
//         item.classList.remove('is-blind');
//       });
//     }
//   });
// }
// + sideMenuToggle

var sideMenuList = $('.sidebar-menu > li'),
  selectedSideLink = sideMenuList.children('a'),
  sidebarSubMenuList = $('.sidebar-menu ul'),
  slideDuration = 300;
var sideMenuToggle = function sideMenuToggle() {
  $('.sidebar-menu > li').on('click', '> a', function (e) {
    e.preventDefault();
    var containClass = mainCont.classList.contains('is-active'),
      el = $(e.currentTarget);
    if (containClass) {
      return;
    } else {
      return subMenuSlideToggle(el);
    }
  });
};

// 활성화 사이드바 컨트롤
var subMenuSlideToggle = function subMenuSlideToggle(el) {
  var seletedMenu = el,
    sideMenuList = $('.sidebar-menu > li'),
    selectedSideLink = sideMenuList.children('a'),
    sidebarSubMenuList = $('.sidebar-menu ul'),
    slideDuration = 300;
  if (seletedMenu.hasClass('on') && seletedMenu.next().is(':visible')) {
    seletedMenu.removeClass('on');
    seletedMenu.next().stop().slideUp(slideDuration);
  } else if (!(seletedMenu.hasClass('on') && seletedMenu.next().is(':visible'))) {
    selectedSideLink.removeClass('on');
    sidebarSubMenuList.stop().slideUp(slideDuration);
    seletedMenu.addClass('on');
    seletedMenu.next().stop().slideDown(slideDuration);
  }
};

// + 검진예약 Sidebar Floating
var reservationSideBarFloating = function reservationSideBarFloating() {
  var fixHeaderHeight = $('.header').height(),
    currentLayoutOffsetY = $('.reservation-sidebar .inner-wrap').offset().top;
  $(window).on('scroll', function () {
    var nowScrollY = $(window).scrollTop() + fixHeaderHeight;
    var topPos = parseInt(nowScrollY - fixHeaderHeight);
    if (nowScrollY > currentLayoutOffsetY) {
      $('.reservation-sidebar .inner-wrap').stop().animate({
        top: topPos
      }, 250);
    } else if (nowScrollY <= currentLayoutOffsetY) {
      $('.reservation-sidebar .inner-wrap').stop().animate({
        top: 0
      }, 250);
    }
  });
};

/*
 = Popup
*/

// + btnOpenPopup
var btnOpenPopup = function btnOpenPopup() {
  $('.btn-open-popup').on('click', function (e) {
    var target = $(e.currentTarget),
      selectedTarget = target.attr('data-target');
    // popup show
    $('.c-layer-popup' + selectedTarget).addClass('show').attr('aria-hidden', false);
  });
};

// + btnClosePopup
var btnClosePopup = function btnClosePopup() {
  $('.c-modal-header .popup-cls-btn, .c-modal-footer .popup-cls-btn').on('click', function (e) {
    var target = $(e.currentTarget);
    // popup hide
    target.parents('.c-layer-popup').attr('aria-hidden', true).removeClass('show');
  });
};

// medical input

var doctorInfo = function doctorInfo() {
  $('.btn-doctor-detail').on('click', function (e) {
    var target = $(e.currentTarget),
      targetName = target.data('name'),
      detailInfo = $('.doctor-detail-info');
    $('.doctor-card').removeClass('on');
    target.addClass('on');
    detailInfo.removeClass('on');
    $('.medical-team-list').find("[data-target=\"".concat(targetName, "\"]")).addClass('on');
  });
};

// = 검진 예약
var reserveContSideNav = function reserveContSideNav() {
  var reserveContentsArea = $('.resevation-container').find('.reserve-contents-area').innerHeight(),
    reserveContSideNav = $('.resevation-container').find('.reservation-sidebar');
  reserveContSideNav.css('max-height', reserveContentsArea);
};

// + 검진항목 선택
var checkupProduct = function checkupProduct() {
  $('.btn-chkupproduct-select').on('click', function (e) {
    var targetCard = $(e.currentTarget),
      nowChkupCard = targetCard.closest('.institution-detail-card');
    $('.institution-datail-list .institution-detail-card').removeClass('on');
    nowChkupCard.addClass('on');
  });
};

// + 검진예약 하단 bar Control
var reservationBtmBarFixed = function reservationBtmBarFixed() {
  var scrollPoint = 0;
  var btmBarHeight = $('.resevation-btmbar-wrap').outerHeight();
  if ($(window).scrollTop() <= 0) {
    scrollPoint = 0;
  } else {
    scrollPoint = parseInt(window.innerHeight + $(window).scrollTop() + 15); // (41:btmbar-gradient
  }
  if ($('.resevation-btmbar-wrap').find('.btn-bar-toggle').hasClass('is-open')) {
    scrollPoint = scrollPoint + 130;
  } else {
    btmBarHeight = $('.resevation-btmbar-wrap').outerHeight();
  }
  var contentsHeight = parseInt($('.co-location-wrap').outerHeight() + $('.co-cont-section').outerHeight() + btmBarHeight),
    // 컨텐츠 내용 높이
    leftWidth = $('#sideNav').width() + $('.reservation-sidebar').width(),
    leftPosition = $(window).scrollLeft();
  if ($('.resevation-btmbar-wrap').hasClass('no-side')) {
    leftWidth = $('#sideNav').width();
  }
  if (scrollPoint <= contentsHeight) {
    $('.resevation-btmbar-wrap').addClass('fixed');
    $('.resevation-btmbar-wrap').css('left', leftWidth - leftPosition);
  } else {
    $('.resevation-btmbar-wrap').removeClass('fixed');
  }
};

// + 검진항목 하단 버튼 제어
var btmCompareBar = function btmCompareBar() {
  $('.btn-bar-toggle').on('click', function (e) {
    $(this).toggleClass('is-open');
    if ($(this).hasClass('is-open')) {
      $(this).find('.is-blind').text('접기');
    } else {
      $(this).find('.is-blind').text('펼치기');
    }
    var target = $(e.currentTarget);
    var btmCompareHeight = target.closest('.resevation-btmbar-wrap').height();
    reservationBtmBarFixed(btmCompareHeight);
  });
};

//  + 대상자 선택 활성화
var clientActiveCard = function clientActiveCard() {
  $('.client-card.person').on('click', function (e) {
    var target = $(e.currentTarget),
      cliendCardList = $('.targets-list').find('.client-card.person');
    cliendCardList.removeClass('on');
    target.addClass('on');
  });
};

// + 검진기관 및 항목 카드 선택
var rsvInstitutionCard = function rsvInstitutionCard() {
  $('.rsv-institution-card > a').on('click', function (e) {
    e.preventDefault();
    var target = $(e.currentTarget),
      targetDataName = target.data('name'),
      rsvCardList = $('.rsv-institution-list').find('.rsv-institution-card'),
      rsvDetailView = $('.rsv-institution-list-wrap').find('.detail-card-list');
    rsvCardList.removeClass('on');
    target.parents('.rsv-institution-card').addClass('on');
    rsvDetailView.find('.rsv-institution-datail-field').removeClass('on');
    rsvDetailView.find(".rsv-institution-datail-field[data-target=".concat(targetDataName, "]")).addClass('on');
  });
};

// + 선택검사 체크박스 상태에 따른 스타일 init
var checkupCtgInputChkInit = function checkupCtgInputChkInit() {
  $('.healthexam-item-card .c-chkbox').find('input').each(function () {
    if ($(this).is(':checked')) {
      $(this).closest('.healthexam-item-card').closest('.healthexam-item-card').addClass('on');
    }
  });
};

// +  선택검사 Input Check
var checkupCtgInputChk = function checkupCtgInputChk() {
  var examChk = $('.healthexam-item-card .c-chkbox').find('input');
  examChk.on('change', function (e) {
    var target = $(e.currentTarget),
      inputAttribute = target.attr('type'),
      targetAccodion = target.closest('.chkup-ctg-accordion'),
      targetItemCard = target.closest('.healthexam-item-card'),
      targetAccodionPanel = target.closest('.accrodion-panel');

    // active Style Control
    switch (inputAttribute) {
      case 'radio':
        {
          var targetName = target.attr('name');
          $("input[name=".concat(targetName, "]")).closest('.healthexam-item-card').removeClass('on');
          targetItemCard.addClass('on');
          break;
        }
      case 'checkbox':
        {
          if (target.is(':checked')) {
            target.closest('.healthexam-item-card').addClass('on');
          } else if (!target.is(':checked')) {
            target.closest('.healthexam-item-card').removeClass('on');
          }
          break;
        }
    }
  });
};

// + 선택검사 Total Count 제어
var checkupInputCntControl = function checkupInputCntControl() {
  var examInnerChk = $('.healthexam-item-card .c-chkbox').find('input');
  examInnerChk.on('change', function (e) {
    var inChkItem = $(e.currentTarget),
      inChkItemAccodion = inChkItem.closest('.chkup-ctg-accordion'),
      inChkItemTotalCnt = parseInt(inChkItemAccodion.find('.total-cnt').text()),
      inChkItemCurrentCnt = inChkItemAccodion.find('.current-cnt'),
      inChkAccodionPanel = inChkItem.closest('.accrodion-panel'),
      inChkAccodionLlstElement = inChkItemAccodion.parent('li');

    //  Total Count Accordion Control
    var seletedInputCnt = inChkItemAccodion.find('input:checked').length;
    if (seletedInputCnt > inChkItemTotalCnt) {
      return 0;
    } else {
      inChkItemCurrentCnt.text(seletedInputCnt);
    }
    if (seletedInputCnt === inChkItemTotalCnt && !inChkAccodionLlstElement.is(':last-child')) {
      inChkItemAccodion.removeClass('on').find('.is-blind').text('접기');
      inChkAccodionPanel.delay(200).slideUp(350);
      setTimeout(function () {
        inChkAccodionLlstElement.next('li').find('.accrodion-panel').stop().delay(400).slideDown(300);
        inChkAccodionLlstElement.next('li').find('.chkup-ctg-accordion').addClass('on').find('.is-blind').text('펼치기');
      }, 300);
    }
  });
};

// + 선택검사 ToggleAccordion
var ckupctgToggleAccordion = function ckupctgToggleAccordion() {
  if ($('.chkup-ctg-accordion').hasClass('on')) {
    $(_this).find('.accrodion-panel').show();
  }
  $('.medical-chkup-list').on('click', '.btn-ckupctg-accordion', function (e) {
    e.preventDefault();
    var mcTarget = $(e.currentTarget),
      mcCntField = mcTarget.prev('.cnt'),
      mcCurrentCnt = parseInt(mcCntField.children('.current-cnt').text()),
      mcTotalCnt = parseInt(mcCntField.children('.total-cnt').text()),
      mcAccordionBox = mcTarget.closest('.co-accordion'),
      mcAccordionPanel = mcAccordionBox.children('.accrodion-panel');
    if (mcAccordionBox.hasClass('on') && mcAccordionPanel.is(':visible')) {
      mcAccordionPanel.slideUp(300, function () {
        mcAccordionBox.removeClass('on').find('.is-blind').text('접기');
      });
    } else {
      mcAccordionPanel.slideDown(300, function () {
        mcAccordionBox.addClass('on').find('.is-blind').text('펼치기');
      });
    }
  });
};

// 검진센터 탐방
var rsvCenterFloatingRight = function rsvCenterFloatingRight() {
  var fixHeaderHeight = $('.header').height(),
    currentLayoutOffsetY = $('.visiting-center-section').offset().top,
    panelMargin = 40;
  $(window).on('scroll', function () {
    var nowScrollY = $(window).scrollTop() + fixHeaderHeight;
    var topPos = parseInt(nowScrollY - 175); // contents spacing
    if (nowScrollY > currentLayoutOffsetY) {
      $('.floating-box').stop().animate({
        top: topPos
      }, 300, 'linear');
    } else if (nowScrollY <= currentLayoutOffsetY) {
      $('.floating-box').stop().animate({
        top: 0
      }, 300, 'linear');
    }
  });
};

// + MainContSideNav
var rsvContSideNav = function rsvContSideNav() {
  var mainContentsArea = $('.resevation-container').find('.reserve-contents-area').innerHeight(),
    mainContSideNav = $('.resevation-container').find('.reservation-sidebar');
  mainContSideNav.css('max-height', mainContentsArea);
};

// = Scroll Customazing
// + scrollbarCustom (individual)
var scrollbarCustom = function scrollbarCustom() {
  for (var i = 0; i < arguments.length; i++) {
    window.Scrollbar.init(document.querySelector(i < 0 || arguments.length <= i ? undefined : arguments[i]));
  }
};

// + basicScrollbarCustom  (common)
// - 팝업 내용 많을 경우 custom scrollbar 실행
var basicScrollbarCustom = function basicScrollbarCustom() {
  if ($('.c-layer-popup').hasClass('type03') || $('.c-layer-popup').hasClass('type04') || $('.c-layer-popup').hasClass('type05')) {
    window.Scrollbar.init(document.querySelector('.c-modal-body'));
  }
  if ($('#sideNav').find('.sidebar-menu').length > 0) {
    window.Scrollbar.init(document.querySelector('.sidebar-wrap'));
  }
  if ($('.checkup-sidebar').length > 0) {
    window.Scrollbar.init(document.querySelector('.checkup-sidebar .inner-wrap'));
  }
  if ($('.reservation-sidebar').length > 0) {
    window.Scrollbar.init(document.querySelector('.reservation-sidebar'));
  }
};

// + sidebarScrollbarCustom (terms)
var termsSrollbarCustom = function termsSrollbarCustom() {
  var temsScrollCnt = $('.terms-scroll').length;
  for (var i = 0; i < temsScrollCnt; i++) {
    $('.terms-scroll').eq(i).children('.inner').addClass("scroll-effect".concat(i));
    window.Scrollbar.init(document.querySelector(".scroll-effect".concat(i)));
  }
};

// + useGuideScroll
// const useGuideScroll = () => {
//   let useguideScrollCnt = $('.useguide-field').length;

//   console.log('useguideScrollCnt' + useguideScrollCnt);

//   for (let i = 0; i < useguideScrollCnt; i++) {
//     $('.useguide-field').eq(i).find('.right-wrap').addClass(`guide-scroll${i}`);
//     window.Scrollbar.init(document.querySelector(`.guide-scroll${i}`));
//   }
// };

// = Terms
// + termsGoTop
var termsGoTop = function termsGoTop() {
  $('.btn-terms-go-top').on('click', function () {
    $('html, body').stop().animate({
      scrollTop: '0'
    }, 500);
  });
};
// + termsScrollEffect
var termsScrollEffect = function termsScrollEffect() {
  $(window).on('scroll', function () {
    var guidePopupScrollY = window.scrollY;
    if (guidePopupScrollY > 100) {
      $('.btn-terms-go-top').addClass('on');
    } else {
      $('.btn-terms-go-top').removeClass('on');
    }
  });
};

// + personalInfoScroll
var personalInfoScroll = function personalInfoScroll() {
  $('.policy-list > li > a').on('click', function (e) {
    var target = $(e.currentTarget),
      policyList = target.closest('.policy-list'),
      policyControl = target.attr('id'),
      policyContList = $(".policy-section[aria-labelledby=".concat(policyControl, "]")),
      policyContPosition = policyContList.offset().top - $('.top-header.type-kmi').outerHeight();
    policyList.find(' > li > a').removeClass('on').attr('aria-selected', 'false');
    target.addClass('on').attr('aria-selected', 'true');
    $('html,body').stop().animate({
      scrollTop: policyContPosition
    }, 1000);
  });
};

// + selectedTabGuide
var useGuideSelected = function useGuideSelected() {
  $('.btn-guide-list > li > button').on('click', function (e) {
    var target = $(e.currentTarget),
      guideTabList = target.closest('.btn-guide-list'),
      tabContRight = target.closest('.useguide-field').find('.right-wrap').find('.inner'),
      tabControl = target.attr('id'),
      tabContList = $(".c-guide-section[aria-labelledby=".concat(tabControl, "]")),
      tabContPosition = tabContList.position().top;
    guideTabList.find(' > li > button').attr('aria-selected', 'false');
    target.attr('aria-selected', 'true');

    // tabContRight.stop().animate({ scrollTop: 400 }, 500);

    target.closest('.useguide-field').find('.right-wrap').stop().animate({
      scrollTop: tabContPosition
    }, 700);
  });
};
var useGuideTopTabEvent = function useGuideTopTabEvent() {
  var $useGuideTabList = $('.useguide-tab-wrap').find('.top-tab-box').find('.co-tab-list');
  $useGuideTabList.on('click', 'li > a', function (e) {
    useGuideTabInitScroll();
  });
};
function useGuideTabInitScroll(target) {
  var scrollContent = $('tab-content.on');
  $('.tab-content.on').find('.right-wrap').on('scroll', function (e) {
    var target = e.currentTarget,
      nowSideTabList = $(this).closest('.useguide-field').find('.btn-guide-list'),
      nowScrollY = $(this).scrollTop();
    nowSideTabList.css('bacckground-color', '#ddd');
    $(this).find('.c-guide-section').each(function (index, node) {
      var $node = $(this);
      var offsetTop = parseInt($node.position().top);
      if (nowScrollY >= offsetTop) {
        nowSideTabList.find(' li > button.on').removeClass('on');
        var currentPageIndex = $node.index();
        nowSideTabList.find(' li > button').eq(currentPageIndex).addClass('on');
      }
    });
  });
}

// + jobStress Progressbar
var jobProgressbar = function jobProgressbar() {
  var i = 0,
    progressList = document.querySelectorAll('.jo-progress');
  Array.prototype.forEach.call(progressList, function (value, index) {
    var elemWidth = value.querySelector('span').innerText;
    function progressCall(index) {
      var prgbarElem = progressList[index];
      var barWidth = 0;
      if (i === 0) {
        var prgInterval = setInterval(doing, 20);
      }
      function doing() {
        if (barWidth >= elemWidth) {
          clearInterval(prgInterval);
          i = 0;
        } else {
          {
            barWidth++;
            if (elemWidth <= barWidth) {
              prgbarElem.style.width = elemWidth + '%';
              console.log(prgbarElem.style.width);
            } else {
              prgbarElem.style.width = barWidth + '%';
            }
          }
        }
      }
    }
    progressCall(index);
  });
};

// copy Control
document.addEventListener('contextmenu', function (e) {
  e.preventDefault();
});
document.addEventListener('dragstart', function (e) {
  e.preventDefault();
});
document.addEventListener('selectstart', function (e) {
  e.preventDefault();
});

// = Function()
openUserControl();
goToTop();
sideMenuToggle();
btnOpenPopup();
btnClosePopup();
basicScrollbarCustom();
termsSrollbarCustom();
selectedTabList();
minHeightControl();
//# sourceMappingURL=maps/common.js.map
