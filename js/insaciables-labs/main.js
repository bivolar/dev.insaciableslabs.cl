// Opciones para spinner
var opts = {
  lines: 13, // The number of lines to draw
  length: 7, // The length of each line
  width: 4, // The line thickness
  radius: 10, // The radius of the inner circle
  corners: 1, // Corner roundness (0..1)
  rotate: 0, // The rotation offset
  color: '#000', // #rgb or #rrggbb
  speed: 1, // Rounds per second
  trail: 60, // Afterglow percentage
  shadow: false, // Whether to render a shadow
  hwaccel: false, // Whether to use hardware acceleration
  className: 'spinner', // The CSS class to assign to the spinner
  zIndex: 2e9, // The z-index (defaults to 2000000000)
  top: 'auto', // Top position relative to parent in px
  left: 'auto' // Left position relative to parent in px
};


window.backbone = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  init: function() {
  }
};

$(document).ready(function(){
  backbone.init();
});


//Validacion Form 

$(function(){
  $('form#contact').validate({

    errorPlacement: function(error, element) {  },
    highlight: function(element, errorClass, validClass) {
      $(element).closest(".control-group").addClass(errorClass);
    },
    unhighlight: function(element, errorClass, validClass) {
      $(element).closest(".control-group").removeClass(errorClass);
    },
    submitHandler: function(form) {
      var spinner = new Spinner(opts).spin(document.getElementById('contact'));
      $(form).find("button[type='submit']").attr('disabled','disabled').text('Enviando...');
      $.post(
        "php/send-contact.php",
        $(form).serialize())
      .done(function(data) {
        if($.parseJSON(data).success === 'true') {
          AlertView.msg($(form), { 
           alert: 'success', 
           msg: 'Tu mensaje va viajando a nuestros laboratorios en este segundo. Gracias!' 
         });
          $(form).find("input[type='text'], textarea").val(''); //Limpiar form
        } else {
          AlertView.msg($(form), { 
           alert: 'error', 
           msg: 'Algo (no tan terrible) pasó, intenta nuevamente.' 
         });
        }
      })
      .fail(function(data) {
        AlertView.msg($(form), { 
         alert: 'error', 
         msg: 'Algo (no tan terrible) pasó, intenta nuevamente.' 
       });
      })
      .always(function(data) {
        spinner.stop();
        $(form).find("button[type='submit']").removeAttr('disabled').text('Enviar');
      });
      return false;
    },
    rules: {
      nombre: {
        required: true
      },
      email: {
        required: true,
        email: true
      },
      mensaje: {
        required: true
      }
    }
  });

  // Biografias
  
  $('.bio-link').click(function(){
    var texto = $(this).attr('data-bio');
    var texto_actual = $('#bio-detail .accordion-inner').text()
    
    $('#bio-detail').on('show', function(){
      $('#bio-detail .accordion-inner').text( texto );
    });
    
    if (texto === texto_actual) { 
      console.log('!!!');

      $('#bio-detail').collapse('toggle');  
    } else {

      $('#bio-detail').collapse('hide').on('hidden', function() {
        
        $(this).collapse('show');

      });
    }
    
    
    
  });

});