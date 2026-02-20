/**

        videoWrap();
        openNavMobile();
        openWelcome();
        btnQuantity();
        tabs();
        changeValue();
        dayTimeInput();
        btnLoadMore();
        colorList();
        rangeslider();
        visibleHeader();
        scollElement();
        goTop();
        animateImgItem();
        animateBoxVideo();
        numberNotNegative();
        ajaxContactForm();
        ajaxSubscribe.eventLoad();
        footer();
        popupProduct();
        animateText();
        preloader();
**/

(function ($) {
  ("use strict");

  var videoWrap = function () {
    if ($("div").hasClass("video-wrap")) {
      $(".popup-youtube").magnificPopup({
        type: "iframe",
      });
    }
  };

  var openNavMobile = () => {
    if ($(".header").hasClass("header")) {
      $(".mobile-button").on("click", () => {
        $(".mobile-nav-wrap").toggleClass("active");
        $("body").toggleClass("no-scroll");
      });

      $(".overlay-mobile-nav").on("click", () => {
        $(".mobile-nav-wrap").toggleClass("active");
        $("body").toggleClass("no-scroll");
      });
      $(".mobile-nav-close").on("click", () => {
        $(".mobile-nav-wrap").toggleClass("active");
        $("body").toggleClass("no-scroll");
      });

      $(document).on("click", ".menu-item-has-children-mobile", function () {
        var args = { duration: 200 };
        if ($(this).hasClass("active")) {
          $(this).children(".sub-menu-mobile").slideUp(args);
          $(this).removeClass("active");
        } else {
          $(".sub-menu-mobile").slideUp(args);
          $(this).children(".sub-menu-mobile").slideDown(args);
          $(".menu-item-has-children-mobile").removeClass("active");
          $(this).addClass("active");
        }
      });
    }
  };

  var openWelcome = function () {
    $(".btn-open-welcome").on("click", () => {
      $(".box-welcome").toggleClass("active");
      $("body").toggleClass("no-scroll");
    });
    $(".btn-close-welcome").on("click", () => {
      $(".box-welcome").toggleClass("active");
      $("body").toggleClass("no-scroll");
    });
    $(".box-welcome .tf-overlay").on("click", () => {
      $(".box-welcome").toggleClass("active");
      $("body").toggleClass("no-scroll");
    });
  };

  //btnQuantity
  var btnQuantity = function () {
    $(".minus-btn").on("click", function (e) {
      e.preventDefault();
      var $this = $(this);
      var $input = $this.closest("div").find("input");
      var value = parseInt($input.val());

      if (value > 1) {
        value = value - 1;
      }

      $input.val(value);
    });

    $(".plus-btn").on("click", function (e) {
      e.preventDefault();
      var $this = $(this);
      var $input = $this.closest("div").find("input");
      var value = parseInt($input.val());

      if (value > 0) {
        value = value + 1;
      }

      $input.val(value);
    });
  };
  var tabs = function () {
    $(".wg-tabs").each(function () {
      $(this).find(".widget-content-tab").children().hide();
      $(this).find(".widget-content-tab").children(".active").show();
      $(this)
        .find(".menu-tab")
        .children(".item")
        .on("click", function () {
          var liActive = $(this).index();
          var contentActive = $(this)
            .siblings()
            .removeClass("active")
            .parents(".wg-tabs")
            .find(".widget-content-tab")
            .children()
            .eq(liActive);
          contentActive.addClass("active").fadeIn("slow");
          contentActive.siblings().removeClass("active");
          $(this)
            .addClass("active")
            .parents(".wg-tabs")
            .find(".widget-content-tab")
            .children()
            .eq(liActive)
            .siblings()
            .hide();
        });
    });
  };
  var changeValue = function () {
    if ($(".tf-dropdown-sort").length > 0) {
      $(".select-item").click(function (event) {
        $(this)
          .closest(".tf-dropdown-sort")
          .find(".text-sort-value")
          .text($(this).find(".text-value-item").text());

        $(this)
          .closest(".dropdown-menu")
          .find(".select-item.active")
          .removeClass("active");

        $(this).addClass("active");
      });
    }
  };
  var shopSorting = function () {
    var $control = $("#tf-shop-control");
    if (!$control.length) return;

    var $grid = $control
      .parent()
      .find(".wg-shop-content .grid-layout-3")
      .first();
    if (!$grid.length) return;

    var parsePrice = function (text) {
      return Number(String(text || "").replace(/[^0-9]/g, "")) || 0;
    };

    var getPrice = function ($card) {
      var $priceEl = $card.find(".price-2").first();
      return parsePrice($priceEl.text());
    };

    var getTags = function ($card) {
      return $card
        .find(".trendy-list .trendy-item p")
        .map(function () {
          return $(this).text().trim().toLowerCase();
        })
        .get();
    };

    var ensureOriginalOrder = function () {
      $grid.children(".card-product").each(function (index) {
        if ($(this).attr("data-original-index") === undefined) {
          $(this).attr("data-original-index", index);
        }
      });
    };

    var sortCards = function (mode) {
      ensureOriginalOrder();
      var cards = $grid.children(".card-product").get();

      cards.sort(function (a, b) {
        var $a = $(a);
        var $b = $(b);
        var priceA = getPrice($a);
        var priceB = getPrice($b);
        var indexA = Number($a.attr("data-original-index")) || 0;
        var indexB = Number($b.attr("data-original-index")) || 0;
        var tagsA = getTags($a);
        var tagsB = getTags($b);

        if (mode === "price-low") {
          return priceA - priceB || indexA - indexB;
        }

        if (mode === "price-high") {
          return priceB - priceA || indexA - indexB;
        }

        if (mode === "best-selling") {
          var scoreA =
            (tagsA.includes("hot") ? 3 : 0) +
            (tagsA.includes("sale") ? 2 : 0) +
            (tagsA.includes("new") ? 1 : 0);
          var scoreB =
            (tagsB.includes("hot") ? 3 : 0) +
            (tagsB.includes("sale") ? 2 : 0) +
            (tagsB.includes("new") ? 1 : 0);
          return scoreB - scoreA || priceB - priceA || indexA - indexB;
        }

        if (mode === "new-arrivals") {
          var isNewA = tagsA.includes("new") ? 1 : 0;
          var isNewB = tagsB.includes("new") ? 1 : 0;
          return isNewB - isNewA || indexA - indexB;
        }

        return indexA - indexB;
      });

      $.each(cards, function (_, card) {
        $grid.append(card);
      });
    };

    var getModeFromLabel = function (label) {
      var normalized = String(label || "")
        .trim()
        .toLowerCase();
      if (normalized === "price: low to high") return "price-low";
      if (normalized === "price: high to low") return "price-high";
      if (normalized === "best selling") return "best-selling";
      if (normalized === "new arrivals") return "new-arrivals";
      return "default";
    };

    $control.on("click", ".tf-dropdown-sort .select-item", function () {
      var label = $(this).find(".text-value-item").text();
      sortCards(getModeFromLabel(label));
    });

    var $active = $control
      .find(".tf-dropdown-sort .select-item.active .text-value-item")
      .first();
    if ($active.length) {
      $control.find(".text-sort-value").text($active.text().trim());
      sortCards(getModeFromLabel($active.text()));
    }
  };

  var dayTimeInput = function () {
    if ($(".choose-date").length > 0) {
      $("#day").on("focus", function () {
        $(".choose-date").addClass("has-value");
      });

      $("#day").on("blur", function () {
        if (!$(this).val()) {
          $(".choose-date").removeClass("has-value");
        }
      });
    }
    if ($(".choose-date-2").length > 0) {
      $("#time").on("focus", function () {
        $(".choose-date-2").addClass("has-value");
      });

      $("#time").on("blur", function () {
        if (!$(this).val()) {
          $(".choose-date-2").removeClass("has-value");
        }
      });
    }
    if ($(".amount").length > 0) {
      $("#positiveNumber").on("input", function () {
        let value = $(this).val();

        if (value.includes("-")) {
          $(this).val(value.replace(/-/g, ""));
        }

        if (value === "0" || value === "") {
          $(this).val("");
        }

        const numValue = parseInt(value, 10);
        if (numValue < 1) {
          $(this).val("");
        }
      });
    }
  };

  var btnLoadMore = function () {
    $(".btn-loadMore").click(function () {
      var container = $(this).closest(".container-loadmore");

      var hiddenItems = container.find(".item.hidden");

      hiddenItems.slice(0, 1).each(function (index) {
        $(this)
          .removeClass("hidden")
          .hide()
          .fadeIn(400 * (index + 1));
      });

      if (container.find(".item.hidden").length === 0) {
        $(this).hide();
      }
    });
  };
  var colorList = function () {
    $(".color-list li").on("click", function () {
      $(".color-list li").removeClass("active");
      $(this).addClass("active");
    });
  };
  var rangeslider = function () {
    if ($("#range-two-val").length > 0) {
      var skipSlider = document.getElementById("range-two-val");
      var skipValues = [
        document.getElementById("skip-value-lower"),
        document.getElementById("skip-value-upper"),
      ];

      noUiSlider.create(skipSlider, {
        start: [1, 500],
        connect: true,
        behaviour: "drag",
        step: 1,
        range: {
          min: 10,
          max: 1000,
        },
        format: {
          to: function (value) {
            return Math.round(value);
          },
          from: function (value) {
            return Number(value);
          },
        },
      });

      skipSlider.noUiSlider.on("update", function (values, handle) {
        skipValues[handle].innerHTML = "$" + values[handle];
      });
    }
  };
  var visibleHeader = function () {
    let lastScrollTop = 0;
    $(window).scroll(function () {
      let scrollTop = $(this).scrollTop();
      if (scrollTop < lastScrollTop) {
        if (scrollTop > 0) {
          $(".fixed-header.style-absolute").addClass("visible");
        }
      } else {
        $(".fixed-header.style-absolute").removeClass("visible");
      }
      if (scrollTop < 350) {
        $(".fixed-header.style-absolute").removeClass("visible");
      }

      lastScrollTop = scrollTop;
    });
  };
  var scollElement = function () {
    if ($(".scroll-element").length > 0) {
      $(document).ready(function () {
        let lastScrollTop = 0;
        const distance = 10;
        $(window).on("scroll", function () {
          const st = $(this).scrollTop();

          if (st > lastScrollTop) {
            $(".scroll-element").css("transform", `translateY(${distance}px)`);
          } else {
            $(".scroll-element").css("transform", `translateY(-${distance}px)`);
          }
          lastScrollTop = st;
        });
      });
    }

    if ($(".scroll-element-2").length > 0) {
      $(document).ready(function () {
        let lastScrollTop = 0;
        const distance = 10;
        $(window).on("scroll", function () {
          const st = $(this).scrollTop();

          if (st > lastScrollTop) {
            $(".scroll-element-2").css(
              "transform",
              `translateY(-${distance}px)`,
            );
          } else {
            // Cuộn lên
            $(".scroll-element-2").css(
              "transform",
              `translateY(${distance}px)`,
            );
          }
          lastScrollTop = st;
        });
      });
    }

    if ($(".scroll-element-3").length > 0) {
      $(document).ready(function () {
        let lastScrollTop = 0;
        const distance = 10;

        $(window).on("scroll", function () {
          const st = $(this).scrollTop();

          if (st > lastScrollTop) {
            $(".scroll-element-3").css(
              "transform",
              `translateX(-${distance}px)`,
            );
          } else {
            $(".scroll-element-3").css(
              "transform",
              `translateX(${distance}px)`,
            );
          }
          lastScrollTop = st;
        });
      });
    }

    if ($(".scroll-element-4").length > 0) {
      $(document).ready(function () {
        let lastScrollTop = 0;
        const distance = 10;

        $(window).on("scroll", function () {
          const st = $(this).scrollTop();

          if (st > lastScrollTop) {
            $(".scroll-element-4").css(
              "transform",
              `translateX(${distance}px)`,
            );
          } else {
            $(".scroll-element-4").css(
              "transform",
              `translateX(-${distance}px)`,
            );
          }
          lastScrollTop = st;
        });
      });
    }
  };
  //goTop
  var goTop = function () {
    if ($("div").hasClass("progress-wrap")) {
      var progressPath = document.querySelector(".progress-wrap path");
      var pathLength = progressPath.getTotalLength();
      progressPath.style.transition = progressPath.style.WebkitTransition =
        "none";
      progressPath.style.strokeDasharray = pathLength + " " + pathLength;
      progressPath.style.strokeDashoffset = pathLength;
      progressPath.getBoundingClientRect();
      progressPath.style.transition = progressPath.style.WebkitTransition =
        "stroke-dashoffset 10ms linear";
      var updateprogress = function () {
        var scroll = $(window).scrollTop();
        var height = $(document).height() - $(window).height();
        var progress = pathLength - (scroll * pathLength) / height;
        progressPath.style.strokeDashoffset = progress;
      };
      updateprogress();
      $(window).scroll(updateprogress);
      var offset = 200;
      var duration = 0;
      jQuery(window).on("scroll", function () {
        if (jQuery(this).scrollTop() > offset) {
          jQuery(".progress-wrap").addClass("active-progress");
        } else {
          jQuery(".progress-wrap").removeClass("active-progress");
        }
      });
      jQuery(".progress-wrap").on("click", function (event) {
        event.preventDefault();
        jQuery("html, body").animate({ scrollTop: 0 }, duration);
        return false;
      });
    }
  };
  var animateImgItem = function () {
    $(window).on("scroll", function () {
      const isSmallScreen = window.matchMedia("(max-width: 550px)").matches;

      $(".tf-animate-1, .tf-animate-2, .tf-animate-3, .tf-animate-4").each(
        function () {
          const sectionOffsetTop = $(this).offset().top;
          const sectionHeight = $(this).outerHeight();
          const scrollPosition = $(window).scrollTop();
          const windowHeight = $(window).height();

          if (isSmallScreen) {
            // Logic cho màn hình nhỏ hơn 550px
            if (
              scrollPosition + windowHeight > sectionOffsetTop + 20 &&
              scrollPosition < sectionOffsetTop + sectionHeight - 20
            ) {
              $(this).addClass("active-animate");
            }
          } else {
            // Logic cho màn hình lớn hơn hoặc bằng 550px
            if (
              scrollPosition + windowHeight > sectionOffsetTop + 100 &&
              scrollPosition < sectionOffsetTop + sectionHeight - 100
            ) {
              $(this).addClass("active-animate");
            }
          }
        },
      );
    });
  };

  var animateBoxVideo = function () {
    $(window).on("scroll", function () {
      $(
        ".tf-animate__box, .tf-animate__box-2, .tf-animate__rotate-left, .tf-animate__rotate-right",
      ).each(function () {
        const sectionOffsetTop = $(this).offset().top;
        const sectionHeight = $(this).outerHeight();
        const scrollPosition = $(window).scrollTop();
        const windowHeight = $(window).height();
        if (
          scrollPosition + windowHeight > sectionOffsetTop + 100 &&
          scrollPosition < sectionOffsetTop + sectionHeight - 100
        ) {
          if ($(this).hasClass("tf-animate__box")) {
            $(this).addClass("animate__animated  animate__zoomInLeft");
          } else if ($(this).hasClass("tf-animate__box-2")) {
            $(this).addClass("animate__animated animate__zoomInRight");
          } else if ($(this).hasClass("tf-animate__rotate-right")) {
            $(this).addClass("animate__animated animate__rotateInUpRight");
          } else if ($(this).hasClass("tf-animate__rotate-left")) {
            $(this).addClass("animate__animated animate__rotateInUpLeft");
          }
        }
      });
    });
  };

  var numberNotNegative = function () {
    $('input[type="number"]').on("keypress", function (e) {
      if (e.which === 45) {
        e.preventDefault();
      }
    });

    $('input[type="number"]').on("input", function () {
      if ($(this).val() < 0) {
        $(this).val("");
      }
    });
  };
  var ajaxContactForm = function () {
    $("#contactform,#commentform").each(function () {
      $(this).validate({
        submitHandler: function (form) {
          var $form = $(form),
            str = $form.serialize(),
            loading = $("<div />", { class: "loading" });

          $.ajax({
            type: "POST",
            url: $form.attr("action"),
            data: str,
            beforeSend: function () {
              $form.find(".send-wrap").append(loading);
            },
            success: function (msg) {
              var result, cls;
              if (msg === "Success") {
                result = "Message Sent Successfully To Email Administrator";
                cls = "msg-success";
              } else {
                result = "Error sending email.";
                cls = "msg-error";
              }

              $form.prepend(
                $("<div />", {
                  class: "flat-alert mb-20 " + cls,
                  text: result,
                }).append(
                  $(
                    '<a class="close mt-0" href="#"><i class="fa fa-close"></i></a>',
                  ),
                ),
              );

              $form.find(":input").not(".submit").val("");
            },
            complete: function (xhr, status, error_thrown) {
              $form.find(".loading").remove();
            },
          });
        },
      });
    });
  };
  var ajaxSubscribe = {
    obj: {
      subscribeEmail: $("#subscribe-email"),
      subscribeButton: $("#subscribe-button"),
      subscribeMsg: $("#subscribe-msg"),
      subscribeContent: $("#subscribe-content"),
      dataMailchimp: $("#subscribe-form").attr("data-mailchimp"),
      success_message:
        '<div class="notification_ok">Thank you for joining our mailing list! Please check your email for a confirmation link.</div>',
      failure_message:
        '<div class="notification_error">Error! <strong>There was a problem processing your submission.</strong></div>',
      noticeError: '<div class="notification_error">{msg}</div>',
      noticeInfo: '<div class="notification_error">{msg}</div>',
      basicAction: "mail/subscribe.php",
      mailChimpAction: "mail/subscribe-mailchimp.php",
    },

    eventLoad: function () {
      var objUse = ajaxSubscribe.obj;

      $(objUse.subscribeButton).on("click", function () {
        if (window.ajaxCalling) return;
        var isMailchimp = objUse.dataMailchimp === "true";

        if (isMailchimp) {
          ajaxSubscribe.ajaxCall(objUse.mailChimpAction);
        } else {
          ajaxSubscribe.ajaxCall(objUse.basicAction);
        }
      });
    },

    ajaxCall: function (action) {
      window.ajaxCalling = true;
      var objUse = ajaxSubscribe.obj;
      var messageDiv = objUse.subscribeMsg.html("").hide();
      $.ajax({
        url: action,
        type: "POST",
        dataType: "json",
        data: {
          subscribeEmail: objUse.subscribeEmail.val(),
        },
        success: function (responseData, textStatus, jqXHR) {
          if (responseData.status) {
            objUse.subscribeContent.fadeOut(500, function () {
              messageDiv.html(objUse.success_message).fadeIn(500);
            });
          } else {
            switch (responseData.msg) {
              case "email-required":
                messageDiv.html(
                  objUse.noticeError.replace(
                    "{msg}",
                    "Error! <strong>Email is required.</strong>",
                  ),
                );
                break;
              case "email-err":
                messageDiv.html(
                  objUse.noticeError.replace(
                    "{msg}",
                    "Error! <strong>Email invalid.</strong>",
                  ),
                );
                break;
              case "duplicate":
                messageDiv.html(
                  objUse.noticeError.replace(
                    "{msg}",
                    "Error! <strong>Email is duplicate.</strong>",
                  ),
                );
                break;
              case "filewrite":
                messageDiv.html(
                  objUse.noticeInfo.replace(
                    "{msg}",
                    "Error! <strong>Mail list file is open.</strong>",
                  ),
                );
                break;
              case "undefined":
                messageDiv.html(
                  objUse.noticeInfo.replace(
                    "{msg}",
                    "Error! <strong>undefined error.</strong>",
                  ),
                );
                break;
              case "api-error":
                objUse.subscribeContent.fadeOut(500, function () {
                  messageDiv.html(objUse.failure_message);
                });
            }
            messageDiv.fadeIn(500);
          }
        },
        error: function (jqXHR, textStatus, errorThrown) {
          alert("Connection error");
        },
        complete: function (data) {
          window.ajaxCalling = false;
        },
      });
    },
  };
  var footer = function () {
    var args = { duration: 250 };
    $(".footer-title-mobile").on("click", function () {
      $(this).parent(".footer-col-block").toggleClass("open");
      if (!$(this).parent(".footer-col-block").is(".open")) {
        $(this).next().slideUp();
      } else {
        $(this).next().slideDown();
      }
    });
  };
  var popupProduct = function () {
    $(window).on("scroll", function () {
      const $element = $(".tf-sticky-btn");
      const footerOffset = $("#footer-main").offset().top;
      const scrollPosition = $(window).scrollTop() + $(window).height();

      if (scrollPosition >= footerOffset) {
        $element.addClass("remove");
      } else {
        $element.removeClass("remove");
      }
    });
  };
  var animateText = function () {
    if ($(".text-anime-style-1").length) {
      let animatedTextElements = document.querySelectorAll(
        ".text-anime-style-1",
      );

      animatedTextElements.forEach((element) => {
        if (element.animation) {
          element.animation.progress(1).kill();
          element.split.revert();
        }

        element.split = new SplitText(element, {
          type: "words",
        });

        element.split.words.forEach((word, index) => {
          gsap.set(word, {
            opacity: 0,
            scale: index % 2 === 0 ? 1.5 : 0.8,
            transformOrigin: "center center",
          });
        });

        element.animation = gsap.to(element.split.words, {
          scrollTrigger: {
            trigger: element,
            start: "top 90%",
            toggleActions: "play reverse play reverse",
          },
          scale: 1,
          opacity: 1,
          duration: 1,
          ease: "power2.out",
        });
      });
    }

    if ($(".text-anime-style-2").length) {
      let animatedTextElements = document.querySelectorAll(
        ".text-anime-style-2",
      );

      animatedTextElements.forEach((element) => {
        if (element.animation) {
          element.animation.progress(1).kill();
          element.split.revert();
        }

        element.split = new SplitText(element, {
          type: "lines",
          linesClass: "split-line",
        });

        gsap.set(element.split.lines, {
          opacity: 1,
          y: 0,
          rotateY: -90,
        });

        element.animation = gsap.to(element.split.lines, {
          scrollTrigger: {
            trigger: element,
            start: "top 90%",
            toggleActions: "play reverse play reverse",
          },
          y: 0,
          rotateY: 0,
          opacity: 1,
          duration: 1,
          ease: "power2.out",
          stagger: 0.1,
        });
      });
    }
  };
  var portfolioIsotope = function () {
    if ($().isotope) {
      // Isotope cho container .portfolio-wrap
      var $container1 = $(".portfolio-wrap").isotope({
        layoutMode: "masonry",
        itemSelector: ".item",
        percentPosition: true,
        stagger: 0,
        masonry: {
          columnWidth: ".grid-sizer",
        },
      });

      // Isotope cho container .portfolio-wrap2 (chỉ với layoutMode: "masonry" và itemSelector)
      var $container2 = $(".portfolio-wrap2").isotope({
        layoutMode: "masonry", // Chỉ sử dụng masonry layout mode
        itemSelector: ".item", // Chọn item có class "item"
      });

      // Load more cho .portfolio-wrap
      $("#load-more").on("click", function () {
        var $hiddenItems = $(".item.hidden").slice(0, 3); // Lấy 3 item mỗi lần
        $hiddenItems.removeClass("hidden");

        $container1.append($hiddenItems);
        $container1.isotope("reloadItems").isotope("layout");

        if ($(".item.hidden").length === 0) {
          $(this).hide();
        }
      });

      // Load more cho .portfolio-wrap2
      $("#load-more2").on("click", function () {
        var $hiddenItems = $(".item.hidden").slice(0, 3); // Lấy 3 item mỗi lần
        $hiddenItems.removeClass("hidden");

        $container2.append($hiddenItems);
        $container2.isotope("reloadItems").isotope("layout");

        if ($(".item.hidden").length === 0) {
          $(this).hide();
        }
      });

      // Xử lý filter cho cả 2 container
      $(".portfolio-filter li").on("click", function () {
        var selector = $(this).find("a").attr("data-filter");
        $(".portfolio-filter li").removeClass("active");
        $(this).addClass("active");
        $container1.isotope({ filter: selector });
        $container2.isotope({ filter: selector });
        return false;
      });
    }
  };
  /* totalPriceVariant
  ------------------------------------------------------------------------------------- */
  var totalPriceVariant = function () {
    $(".tf-product-info-list,.tf-cart-item,.mini-cart-item").each(function () {
      var productItem = $(this);
      var basePrice =
        parseFloat(productItem.find(".price-on-sale").data("base-price")) ||
        parseFloat(productItem.find(".price-on-sale").text().replace("$", ""));
      var quantityInput = productItem.find(".quantity-product");

      function updateTotalPrice(price, scope) {
        var currentPrice =
          price ||
          parseFloat(scope.find(".price-on-sale").text().replace("$", ""));
        var quantity = parseInt(scope.find(".quantity-product").val());
        var totalPrice = currentPrice * quantity;
        scope
          .find(".total-price")
          .text("$" + totalPrice.toFixed(2).toLocaleString());
      }

      updateTotalPrice(null, productItem);

      productItem.find(".color-btn, .size-btn").on("click", function () {
        var newPrice = parseFloat($(this).data("price")) || basePrice;
        quantityInput.val(1);
        productItem
          .find(".price-on-sale")
          .text("$" + newPrice.toFixed(2).toLocaleString());
        updateTotalPrice(newPrice, productItem);
        updateCartTotal();
      });

      productItem.find(".btn-increase").on("click", function () {
        var currentQuantity = parseInt(quantityInput.val());
        quantityInput.val(currentQuantity + 1);
        updateTotalPrice(null, productItem);
        updateCartTotal();
      });

      productItem.find(".btn-decrease").on("click", function () {
        var currentQuantity = parseInt(quantityInput.val());
        if (currentQuantity > 1) {
          quantityInput.val(currentQuantity - 1);
          updateTotalPrice(null, productItem);
          updateCartTotal();
        }
      });
    });

    function updateCartTotal() {
      let total = 0;
      $(".total-price").each(function () {
        let price = parseFloat(
          $(this).text().replace("$", "").replace(/,/g, ""),
        );
        if (!isNaN(price)) {
          total += price;
        }
      });
      $(".last-total-price").text(
        `Total: $${total.toFixed(2).toLocaleString()}`,
      );
    }

    updateCartTotal();

    $(".remove-cart").on("click", function () {
      $(this).closest(".tf-cart-item").remove();
      updateCartTotal();
    });
  };
  var deleteFile = function (e) {
    $(".remove").on("click", function (e) {
      e.preventDefault();
      var $this = $(this);
      $this.closest(".file-delete").remove();
    });
    $(".clear-file-delete").on("click", function (e) {
      e.preventDefault();
      $(this).closest(".list-file-delete").find(".file-delete").remove();
    });
  };
  /* sidebar mobile
  -------------------------------------------------------------------------*/
  var sidebarMobile = function () {
    if ($(".wrap-sidebar-mobile,.wrap-sidebar-account").length > 0) {
      var sidebar = $(".wrap-sidebar-mobile,.wrap-sidebar-account").html();
      $(".sidebar-mobile-append").append(sidebar);
      // $(".wrap-sidebar-mobile").remove();
    }
  };
  var clickControl = function () {
    $(".btn-address").click(function () {
      $(".show-form-address").toggle();
    });
    $(".btn-hide-address").click(function () {
      $(".show-form-address").hide();
    });

    $(".btn-edit-address").click(function () {
      $(this)
        .closest(".account-address-item")
        .find(".edit-form-address")
        .toggle();
    });
    $(".btn-hide-edit-address").click(function () {
      $(this)
        .closest(".account-address-item")
        .find(".edit-form-address")
        .hide();
    });
  };
  var globalCart = function () {
    var CART_KEY = "farmsphere_products_cart";
    var WISHLIST_KEY = "farmsphere_products_wishlist";
    var ORDER_WHATSAPP_NUMBER = "2347077195098";

    var parseNaira = function (text) {
      return Number(String(text || "").replace(/[^0-9]/g, "")) || 0;
    };

    var formatNaira = function (value) {
      return "₦" + Number(value || 0).toLocaleString("en-NG");
    };

    var getStore = function (key) {
      try {
        var raw = localStorage.getItem(key);
        return raw ? JSON.parse(raw) : [];
      } catch (error) {
        return [];
      }
    };

    var saveStore = function (key, list) {
      localStorage.setItem(key, JSON.stringify(list));
    };

    var getCart = function () {
      return getStore(CART_KEY);
    };

    var saveCart = function (cart) {
      saveStore(CART_KEY, cart);
    };

    var getWishlist = function () {
      return getStore(WISHLIST_KEY);
    };

    var saveWishlist = function (wishlist) {
      saveStore(WISHLIST_KEY, wishlist);
    };

    var totalQuantity = function (cart) {
      return cart.reduce(function (sum, item) {
        return sum + (item.qty || 0);
      }, 0);
    };

    var totalAmount = function (cart) {
      return cart.reduce(function (sum, item) {
        return sum + (item.price * item.qty || 0);
      }, 0);
    };

    var getProductFromCard = function (card) {
      if (!card) return null;
      var $card = $(card);
      var $nameEl = $card.find(".name-product").first();
      var $priceEl = $card.find(".price-2").first();
      var $imageEl = $card.find(".image img").first();
      if (!$nameEl.length || !$priceEl.length || !$imageEl.length) return null;

      var name = $nameEl.text().trim();
      return {
        id: name.toLowerCase().replace(/\s+/g, "-"),
        name: name,
        price: parseNaira($priceEl.text()),
        image: $imageEl.attr("src") || $imageEl.attr("data-src") || "",
        qty: 1,
      };
    };

    var addItemToCart = function (item) {
      if (!item) return;
      var cart = getCart();
      var existing = cart.find(function (cartItem) {
        return cartItem.id === item.id;
      });

      if (existing) {
        existing.qty += 1;
      } else {
        cart.push({
          id: item.id,
          name: item.name,
          price: item.price,
          image: item.image,
          qty: 1,
        });
      }

      saveCart(cart);
    };

    var ensureCartModal = function () {
      if ($("#addcart").length) {
        if (!$("#cart-title").length) {
          $("#addcart .content-top h3").attr("id", "cart-title");
        }
        if (!$("#mini-cart-list").length) {
          $("#addcart .mini-cart-list").attr("id", "mini-cart-list");
        }
        if (!$("#cart-subtotal").length) {
          $("#addcart .box-price .text-main-2").attr("id", "cart-subtotal");
        }
        return;
      }

      var modalHtml = [
        '<div class="modal fullRight fade modal-addcart" id="addcart">',
        '  <div class="modal-dialog">',
        '    <div class="modal-content">',
        '      <div class="content-top">',
        '        <h3 class="fw-bold" id="cart-title">Basket (0)</h3>',
        '        <span class="icon icon-close link cs-pointer" data-bs-dismiss="modal"></span>',
        "      </div>",
        '      <span class="br-line"></span>',
        '      <ul class="mini-cart-list" id="mini-cart-list"></ul>',
        '      <span class="br-line"></span>',
        '      <div class="content-bottom d-flex justify-content-between">',
        '        <div class="box-price">',
        '          <p class="text-lg">Total Price</p>',
        '          <p class="text-lg fw-bold text-main-2" id="cart-subtotal">₦0</p>',
        "        </div>",
        '        <div class="box-btn">',
        '          <a href="checkout.html" class="tf-btn-nor">Checkout</a>',
        "        </div>",
        "      </div>",
        "    </div>",
        "  </div>",
        "</div>",
      ].join("");

      $("body").append(modalHtml);
    };

    var ensureWishlistModal = function () {
      if ($("#wishlist").length) {
        if (!$("#wishlist-title").length) {
          $("#wishlist .content-top p").attr("id", "wishlist-title");
        }
        if (!$("#wishlist-body").length) {
          $("#wishlist .table-wishlist tbody").attr("id", "wishlist-body");
        }
        $("#wishlist a[href='wishlist.html']").remove();
        return;
      }

      var wishlistHtml = [
        '<div class="modal modalCentered fade modal-wishlist" id="wishlist">',
        '  <div class="modal-dialog modal-dialog-centered">',
        '    <div class="modal-content">',
        '      <div class="content-top">',
        '        <p class="fw-bold text-small text-white" id="wishlist-title">Wishlist (0)</p>',
        '        <span class="icon icon-close text-white link cs-pointer" data-bs-dismiss="modal"></span>',
        "      </div>",
        '      <div class="modal-wishlist-wrap">',
        '        <table class="table-wishlist mb-0"><tbody id="wishlist-body"></tbody></table>',
        "      </div>",
        '      <div class="content-bottom d-flex justify-content-between flex-wrap gap-10">',
        '        <a href="#" data-bs-dismiss="modal" class="text-small text-uppercase link text-decoration-underline">Continue shopping</a>',
        "      </div>",
        "    </div>",
        "  </div>",
        "</div>",
      ].join("");

      $("body").append(wishlistHtml);
    };

    var updateBasketBadges = function (cart) {
      var qty = totalQuantity(cart);
      $(".wg-bag").each(function () {
        var $link = $(this);
        var $badge = $link.find(".cart-count-badge");
        if (!$badge.length) {
          $badge = $('<span class="cart-count-badge"></span>');
          $link.append($badge);
        }
        $badge.text(qty);
        $badge.css("display", qty > 0 ? "inline-flex" : "none");
      });
    };

    var renderCart = function () {
      var cart = getCart();
      var $list = $("#mini-cart-list");
      var $subtotal = $("#cart-subtotal");
      var $title = $("#cart-title");

      if (!$list.length || !$subtotal.length || !$title.length) return;

      $title.text("Basket (" + totalQuantity(cart) + ")");
      $subtotal.text(formatNaira(totalAmount(cart)));

      if (!cart.length) {
        $list.html(
          '<li class="mini-cart-item"><p class="text-def mb-0">Your cart is empty.</p></li>',
        );
        updateBasketBadges(cart);
        return;
      }

      var html = cart
        .map(function (item) {
          return (
            '<li class="mini-cart-item" data-id="' +
            item.id +
            '">' +
            '  <a href="#" class="image">' +
            '    <img src="' +
            item.image +
            '" alt="' +
            item.name +
            '">' +
            "  </a>" +
            '  <div class="cart-info">' +
            '    <a href="#" class="text-def">' +
            item.name +
            "</a>" +
            '    <p class="type">FarmSphere Product</p>' +
            '    <p class="price">' +
            formatNaira(item.price) +
            "</p>" +
            "  </div>" +
            '  <div class="">' +
            '    <div class="wg-quantity-2">' +
            '      <span class="btn-quantity btn-decrease"><i class="fa-solid fa-minus"></i></span>' +
            '      <input class="quantity-product" type="text" value="' +
            item.qty +
            '" readonly>' +
            '      <span class="btn-quantity btn-increase"><i class="fa-solid fa-plus"></i></span>' +
            "    </div>" +
            "  </div>" +
            '  <div class="remove w-auto cs-pointer link cart-remove"><i class="icon-close"></i></div>' +
            "</li>"
          );
        })
        .join("");

      $list.html(html);
      updateBasketBadges(cart);
    };

    var renderWishlist = function () {
      var wishlist = getWishlist();
      var $title = $("#wishlist-title");
      var $body = $("#wishlist-body");

      if (!$title.length || !$body.length) return;

      $title.text("Wishlist (" + wishlist.length + ")");

      if (!wishlist.length) {
        $body.html(
          '<tr><td colspan="4"><p class="mb-0">Your wishlist is empty.</p></td></tr>',
        );
        return;
      }

      var html = wishlist
        .map(function (item) {
          return (
            '<tr class="wishlist-item" data-id="' +
            item.id +
            '">' +
            '  <td class="wishlist-item_remove text-center"><i class="icon-close wishlist-remove"></i></td>' +
            '  <td class="wishlist-item_image"><a href="#"><img src="' +
            item.image +
            '" alt="' +
            item.name +
            '" class="lazyload"></a></td>' +
            '  <td class="wishlist-item_info">' +
            '    <div class="wishlist_name"><a href="#" class="text-def text-main-2 link">' +
            item.name +
            "</a></div>" +
            '    <p class="wishlist_price">' +
            formatNaira(item.price) +
            "</p>" +
            "  </td>" +
            '  <td class="wishlist-item_action"><a href="#" class="tf-btn-nor w-100 wishlist-add-cart">Add To Cart</a></td>' +
            "</tr>"
          );
        })
        .join("");

      $body.html(html);
    };

    var buildWhatsAppOrderUrl = function (customer) {
      var cart = getCart();
      if (!cart.length) return "";

      var lines = [
        "Hello FarmSphere, I want to place an order:",
        "",
        "*Customer Information:*",
        "Name: " + (customer ? customer.name : ""),
        "Phone: " + (customer ? customer.phone : ""),
        "Delivery Address: " + (customer ? customer.address : ""),
        "Preferred Delivery: " + (customer ? customer.delivery : ""),
        "",
        "*Order Details:*",
      ];
      cart.forEach(function (item, index) {
        lines.push(
          (index + 1) +
          ". " +
          item.name +
          " x" +
          item.qty +
          " - " +
          formatNaira(item.price * item.qty),
        );
      });
      lines.push("");
      lines.push("*Total Price: " + formatNaira(totalAmount(cart)) + "*");
      lines.push("");
      lines.push("Please confirm availability and delivery details.");

      return (
        "https://wa.me/" +
        ORDER_WHATSAPP_NUMBER +
        "?text=" +
        encodeURIComponent(lines.join("\n"))
      );
    };

    ensureCartModal();
    ensureWishlistModal();
    renderCart();
    renderWishlist();

    $(document).on("click", ".icon.shoping", function (event) {
      event.preventDefault();
      var item = getProductFromCard($(this).closest(".card-product"));
      addItemToCart(item);
      renderCart();
      var modalEl = document.getElementById("addcart");
      if (modalEl && window.bootstrap) {
        window.bootstrap.Modal.getOrCreateInstance(modalEl).show();
      }
    });

    $(document).on("click", ".icon.white-list", function (event) {
      event.preventDefault();
      var item = getProductFromCard($(this).closest(".card-product"));
      if (!item) return;

      var wishlist = getWishlist();
      var exists = wishlist.find(function (wishlistItem) {
        return wishlistItem.id === item.id;
      });
      if (!exists) {
        wishlist.push({
          id: item.id,
          name: item.name,
          price: item.price,
          image: item.image,
        });
        saveWishlist(wishlist);
      }
      renderWishlist();

      var wishlistModal = document.getElementById("wishlist");
      if (wishlistModal && window.bootstrap) {
        window.bootstrap.Modal.getOrCreateInstance(wishlistModal).show();
      }
    });

    $(document).on("click", ".wg-bag", function (event) {
      event.preventDefault();
      ensureCartModal();
      renderCart();
      var modalEl = document.getElementById("addcart");
      if (modalEl && window.bootstrap) {
        window.bootstrap.Modal.getOrCreateInstance(modalEl).show();
      }
    });

    $(document).on(
      "click",
      "#mini-cart-list .btn-increase, #mini-cart-list .btn-decrease, #mini-cart-list .cart-remove",
      function (event) {
        event.preventDefault();
        var $row = $(this).closest(".mini-cart-item");
        var id = $row.data("id");
        if (!id) return;

        var cart = getCart();
        var item = cart.find(function (cartItem) {
          return cartItem.id === id;
        });
        if (!item) return;

        if ($(this).closest(".btn-increase").length) {
          item.qty += 1;
        } else if ($(this).closest(".btn-decrease").length) {
          item.qty = Math.max(1, item.qty - 1);
        } else if ($(this).closest(".cart-remove").length) {
          cart = cart.filter(function (cartItem) {
            return cartItem.id !== id;
          });
          saveCart(cart);
          renderCart();
          return;
        }

        saveCart(cart);
        renderCart();
      },
    );

    $(document).on(
      "click",
      "#wishlist-body .wishlist-remove",
      function (event) {
        event.preventDefault();
        var id = $(this).closest(".wishlist-item").data("id");
        if (!id) return;
        var wishlist = getWishlist().filter(function (item) {
          return item.id !== id;
        });
        saveWishlist(wishlist);
        renderWishlist();
      },
    );

    $(document).on(
      "click",
      "#wishlist-body .wishlist-add-cart",
      function (event) {
        event.preventDefault();
        var id = $(this).closest(".wishlist-item").data("id");
        if (!id) return;
        var item = getWishlist().find(function (wishlistItem) {
          return wishlistItem.id === id;
        });
        if (!item) return;
        addItemToCart(item);
        renderCart();

        var cartModal = document.getElementById("addcart");
        var wishlistModal = document.getElementById("wishlist");
        if (wishlistModal && window.bootstrap) {
          window.bootstrap.Modal.getOrCreateInstance(wishlistModal).hide();
        }
        if (cartModal && window.bootstrap) {
          window.bootstrap.Modal.getOrCreateInstance(cartModal).show();
        }
      },
    );

    $(document).on("click", "a[href='checkout.html']", function (event) {
      var isCartCheckoutButton = $(this).closest("#addcart").length > 0;
      if (!isCartCheckoutButton) return;

      event.preventDefault();

      var cart = getCart();
      if (!cart.length) {
        alert("Your cart is empty. Add products before checkout.");
        return;
      }

      // Hide cart modal
      var cartModal = document.getElementById("addcart");
      if (cartModal && window.bootstrap) {
        window.bootstrap.Modal.getOrCreateInstance(cartModal).hide();
      }

      // Show order form modal
      var orderModal = document.getElementById("orderFormModal");
      if (orderModal && window.bootstrap) {
        window.bootstrap.Modal.getOrCreateInstance(orderModal).show();
      }
    });

    $(document).on("submit", "#whatsappOrderForm", function (event) {
      event.preventDefault();

      var name = $(this).find('input[name="customerName"]').val();
      var phone = $(this).find('input[name="phoneNumber"]').val();
      var address = $(this).find('textarea[name="address"]').val();
      var delivery = $(this).find('input[name="deliveryDateTime"]').val();

      var customer = {
        name: name,
        phone: phone,
        address: address,
        delivery: delivery,
      };

      var whatsappUrl = buildWhatsAppOrderUrl(customer);
      if (!whatsappUrl) return;

      window.open(whatsappUrl, "_blank");

      // Clear cart and close modal
      saveCart([]);
      renderCart();

      var orderModal = document.getElementById("orderFormModal");
      if (orderModal && window.bootstrap) {
        window.bootstrap.Modal.getOrCreateInstance(orderModal).hide();
      }
      this.reset();
    });
  };
  var preloader = function () {
    $("#loading").fadeOut("slow", function () {
      $(this).remove();
    });
  };
  // Dom Ready
  $(function () {
    videoWrap();
    openNavMobile();
    openWelcome();
    btnQuantity();
    tabs();
    changeValue();
    shopSorting();
    dayTimeInput();
    btnLoadMore();
    colorList();
    rangeslider();
    visibleHeader();
    scollElement();
    goTop();
    animateImgItem();
    animateBoxVideo();
    numberNotNegative();
    ajaxContactForm();
    ajaxSubscribe.eventLoad();
    footer();
    popupProduct();
    animateText();
    portfolioIsotope();
    totalPriceVariant();
    deleteFile();
    sidebarMobile();
    clickControl();
    globalCart();
    preloader();
  });
})(jQuery);
