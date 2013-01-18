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
          tagSourceInput: options.tagSourceInput,
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

      // Use global scope for event binding for different filters
      // leaving and entering the dom.
      $(document).on('click', data.tagSource, function(e) {
        e.preventDefault();
        functions.addTag.call($self, this);
      });

      // Event to add tag on input enter keypress
      $('.tag-source-input').keydown(function(e) {
        if (e.which === 13) {
          e.preventDefault();
          functions.addTag.call($self, this);
        }
      });
      
      // Event bound to tag bar for newly created tags
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
    addTag: function(thisElem) {
      var $self = $(this);   
      var data = $self.data('searchTags');  
      var $thisElem = $(thisElem);
      var tagText = '';

      if ($thisElem.prop('tagName') === 'INPUT') {
        // Use the value of the input
        tagText = $thisElem.val();
      } else {
        // Use the text of the element
        tagText = $(thisElem).text();
      }

      var newTag = data.options.tagTemplate.replace('{VALUE}', tagText);
      $newTag = $(newTag);
      $self.append($newTag);
    },

    // Remove a tag from tag bar
    removeTag: function(thisElem) {
      var $thisElem = $(thisElem);
      $thisElem.closest('.tag-item').remove();
    },

    // Clear all tags from tag bar
    removeAllTags: function() {
      var $self = $(this);   
      $self.empty();
    }
    
  };
  
  /**
   * @param options.tagSource       (string) A selector string for the element who's text becomes the tag
   * @param options.tagSourceInput  (string) A select string for a text input element to use their value as the tag
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
    tagSourceInput: '.tag-source-input',
    buttonRemove: '.tag-remove',
    buttonRemoveAll: '.tag-clear',
    tagTemplate: "<div class='tag-item'>{VALUE}</div>"
  };
})(jQuery);