(function() {
  var destroyTeam, dismissTeamMember, toggleTeamEdit;

  angular.module('exercism', ['ui.bootstrap']);

  $(function() {
    $("[data-toggle=tooltip]").tooltip();
    $("#feedback_guide").popover({
      content: $("#encourage").html(),
      html: true
    });
    $("#feedback_guide_alert .close").click(function(e) {
      e.preventDefault();
      return $.cookie('feedback_guide_alert', 'closed', {
        path: '/'
      });
    });
    $("#current_submission").theiaStickySidebar({
      additionalMarginTop: 70
    });
    if ($.cookie('feedback_guide_alert') !== 'closed') {
      $("#feedback_guide_alert").removeClass("hidden");
    }
    $('.member_delete').on('click', function() {
      var slug, username;
      username = $(this).data('username');
      slug = $(this).data('team');
      if (confirm("Are you sure you want to remove " + username + "?")) {
        return dismissTeamMember(username, slug);
      }
    });
    $('#destroy_team').on('click', function() {
      var slug;
      slug = $(this).data('team');
      if (confirm("Are you sure you want to delete " + slug + "?")) {
        return destroyTeam(slug);
      }
    });
    $('#edit_team').on('click', function(event) {
      event.preventDefault();
      return toggleTeamEdit();
    });
    if (_.any($('.comments'))) {
      emojify.setConfig({
        emoticons_enabled: false
      });
      return emojify.run(document.getElementsByClassName("comments")[0]);
    }
  });

  toggleTeamEdit = function() {
    var delete_buttons, members_box;
    members_box = $('#add_members');
    delete_buttons = $('.member_delete');
    if (members_box.hasClass('hidden')) {
      delete_buttons.removeClass('hidden');
      members_box.slideDown();
      return members_box.removeClass('hidden');
    } else {
      return members_box.slideUp(function() {
        delete_buttons.addClass('hidden');
        return members_box.addClass('hidden');
      });
    }
  };

  destroyTeam = function(slug) {
    var form, href, method_input;
    href = "/teams/" + slug;
    form = $('<form method="post" action="' + href + '"></form>');
    method_input = '<input name="_method" value="delete" type="hidden"/>';
    form.hide().append(method_input).appendTo('body');
    return form.submit();
  };

  dismissTeamMember = function(username, slug) {
    var form, href, method_input;
    href = "/teams/" + slug + "/members/" + username;
    form = $('<form method="post" action="' + href + '"></form>');
    method_input = '<input name="_method" value="delete" type="hidden"/>';
    form.hide().append(method_input).appendTo('body');
    return form.submit();
  };

  (function(i, s, o, g, r, a, m) {
    i["GoogleAnalyticsObject"] = r;
    i[r] = i[r] || function() {
      (i[r].q = i[r].q || []).push(arguments);
    };
    i[r].l = 1 * new Date();
    a = s.createElement(o);
    m = s.getElementsByTagName(o)[0];
    a.async = 1;
    a.src = g;
    m.parentNode.insertBefore(a, m);
  })(window, document, "script", "//www.google-analytics.com/analytics.js", "ga");

  ga("create", "UA-47528450-1", "exercism.io");

  ga("send", "pageview");

}).call(this);

(function() {
  angular.module('exercism').controller("CommentsCtrl", function($scope, $http) {
    $scope.commentThread = {};
    $scope.hideCommentForm = true;
    $scope.showCommentForm = function() {
      return $scope.hideCommentForm = false;
    };
    $scope.hideCommentFormFn = function() {
      return $scope.hideCommentForm = true;
    };
    return $scope.addComment = function(commentId) {
      var commentThreadBody;
      commentThreadBody = $scope.commentThread.body;
      return $http.post("/comments/" + commentId + "/comment_threads", $.param({
        "body": commentThreadBody
      }), {
        headers: {
          "Content-Type": 'application/x-www-form-urlencoded'
        }
      }).success(function(data, status, headers) {
        $scope.commentThreads.push(data);
        $scope.hideCommentForm = true;
        return $scope.commentThread.body = '';
      }).error(function(data, status, headers) {
        return alert(data.body);
      });
    };
  });

}).call(this);

(function() {
  angular.module('exercism').controller("MarkdownCtrl", function($scope, $http) {
    var PATTERN;
    PATTERN = /\B@[a-z0-9_-]+/gi;
    $scope.data || ($scope.data = {});
    $scope.$watch('data.body', function(body) {
      var query, submission_key;
      if (body && PATTERN.test(body)) {
        query = body.match(PATTERN)[0].replace('@', '');
        submission_key = $('.md-markdown-preview textarea').attr('data-submission-key');
        return $http.get("/api/v1/user/find", {
          params: {
            query: query,
            submission_key: submission_key
          }
        }).success(function(data, status, headers) {
          return $('.comment').atwho({
            at: '@',
            data: data
          });
        });
      }
    });
    return $scope.preview = function() {
      return $http.post("/comments/preview", $.param({
        "body": $scope.data.body
      }), {
        headers: {
          "Content-Type": 'application/x-www-form-urlencoded'
        }
      }).success(function(data, status, headers) {
        return $scope.data.preview = data;
      });
    };
  });

}).call(this);

(function() {
  angular.module('exercism').controller("PaginationCtrl", function($scope, $http) {
    $scope.currentPage = 0;
    $scope.pageSize = 10;
    $scope.looks = [];
    $http.get("/api/v1/looks").success(function(data, status, headers) {
      return $scope.looks = data.looks;
    });
    $scope.numberOfPages = function() {
      return Math.ceil($scope.looks.length / $scope.pageSize);
    };
    return this;
  });

  angular.module('exercism').filter('startFrom', function() {
    return function(input, start) {
      start = +start;
      return input.slice(start);
    };
  });

}).call(this);
