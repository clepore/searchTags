/*
* Copyright (c) 2013 Loverly, http://www.lover.ly
*/

(function($) {
  var methods = {
    init: function(options) {
      options = $.extend({}, $.fn.searchTags.defaults, options);
      
      return this.each(function() {
        var $self = $(this);
  
        $self.data('searchTags', {
          options: options,
          tagSource: options.tagSource,
          buttonRemove: options.buttonRemove,
          buttonRemoveAll: options.buttonRemoveAll,
        });       
        functions.setup.call($self); 
      });
    }
  };
    
  var functions = {
    setup: function() {
      var $self = $(this);
      var data = $self.data('searchTags');

      $(document).on('click', data.tagSource, function(e) {
        e.preventDefault();
        functions.addTag.call($self, this);
      });
      
      $self.on('click', data.buttonRemove, function(e) {
        e.preventDefault();
        functions.removeTag.call($self, this);
      });

      $(data.buttonRemoveAll).click(function(e) {
        e.preventDefault();
        functions.removeAllTags.call($self);
      });
    },
    
    // Append tag to tag bar
    addTag: function(thisButton) {
      var $self = $(this);   
      var data = $self.data('searchTags');     
      var tagText = $(thisButton).text();

      var newTag = data.options.tagTemplate.replace('{VALUE}', tagText);
      $newTag = $(newTag);
      $self.append($newTag);
    },

    // Remove a tag
    removeTag: function(thisButton) {
      var $thisButton = $(thisButton);
      $thisButton.closest('.tag-item').remove();
    },

    // Clear search tags
    removeAllTags: function() {
      var $self = $(this);   
      $self.empty();
    }
    
  };
  
  /**
   * @param options.tagSource       (string) A selector string for the element who's text becomes the tag
   *                             OR a selector string of a button who has a "data-for-value" attribute that
   *                                is the id of an element that has a value (input[type=text], textarea, etc)
   * @param options.buttonRemove    (string) A selector string for removing a tag from the tag bar (button must be a child of .tag-item)
   * @param options.buttonRemoveAll (string) A selector string to clear all tags from the tag bar
   * @param options.tagTemplate     (string) HTML with a "{VALUE}" to be replaced by tagSource text
   *
   */
  jQuery.fn.searchTags = function(method) {
    // Method calling logic
    if (methods[method]) {
      return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
    } else if (typeof method === 'object' || ! method) {
      return methods.init.apply(this, arguments);
    } else {
      $.error('Method ' +  method + ' does not exist');
    }
  };
  
  jQuery.fn.searchTags.defaults = {
    tagSource: '.tag-source',
    buttonRemove: '.tag-remove',
    buttonRemoveAll: '.tag-clear',
    tagTemplate: "<div class='tag-item'>{VALUE}</div>"
  };
})(jQuery);