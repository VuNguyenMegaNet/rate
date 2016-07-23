/*
 *  Document   : formsValidation.js
 *  Author     : pixelcave
 *  Description: Custom javascript code used in Forms Validation page
 */

var FormsValidation = function() {

    return {
        init: function() {
            /*
             *  Jquery Validation, Check out more examples and documentation at https://github.com/jzaefferer/jquery-validation
             */

            /* Initialize Form Validation */
            $('#form-validation').validate({
                errorClass: 'help-block animation-slideDown', // You can change the animation class for a different entrance animation - check animations page
                errorElement: 'div',
                errorPlacement: function(error, e) {
                    e.parents('.form-group > div').append(error);
                },
                highlight: function(e) {
                    $(e).closest('.form-group').removeClass('has-success has-error').addClass('has-error');
                    $(e).closest('.help-block').remove();
                },
                success: function(e) {
                    // You can use the following if you would like to highlight with green color the input after successful validation!
                    e.closest('.form-group').removeClass('has-success has-error'); // e.closest('.form-group').removeClass('has-success has-error').addClass('has-success');
                    e.closest('.help-block').remove();
                },
                rules: {
                    val_name: {
                        required: true,
                        minlength: 3
                    },
                    val_fullname: {
                      required: true,
                      minlength: 3
                    },
                    val_email: {
                        required: true,
                        email: true
                    },
                    val_password: {
                        required: true,
                        minlength: 5
                    },
                    val_confirm_password: {
                        required: true,
                        equalTo: '#val_password'
                    },
                    val_bio: {
                        required: true,
                        minlength: 5
                    },
                    val_skill: {
                        required: true
                    },
                    val_sites: {
                      required: true
                    },
                    val_permission: {
                      required: true
                    },
                    val_website: {
                        required: true,
                        url: true
                    },
                    val_digits: {
                        required: true,
                        digits: true
                    },
                    val_number: {
                        required: true,
                        number: true
                    },
                    val_range: {
                        required: true,
                        range: [1, 1000]
                    },
                    val_terms: {
                        required: true
                    }
                },
                messages: {
                    val_name: {
                        required: 'Please enter a name',
                        minlength: 'Your name must consist of at least 3 characters'
                    },
                    val_fullname: {
                      required: 'Please enter a fullname',
                      minlength: 'Your fullname must consist of at least 3 characters'
                    },
                    val_email: 'Please enter a valid email address',
                    val_password: {
                        required: 'Please provide a password',
                        minlength: 'Your password must be at least 5 characters long'
                    },
                    val_confirm_password: {
                        required: 'Please provide a password',
                        minlength: 'Your password must be at least 5 characters long',
                        equalTo: 'Please enter the same password as above'
                    },
                    val_bio: 'Don\'t be shy, share something with us :-)',
                    val_skill: 'Please select a skill!',
                    val_sites: 'Please select a site',
                    val_permission: 'Please select permission',
                    val_website: 'Please enter your website!',
                    val_digits: 'Please enter only digits!',
                    val_number: 'Please enter a number!',
                    val_range: 'Please enter a number between 1 and 1000!',
                    val_terms: 'You must agree to the service terms!'
                },
                submitHandler: function(form) {
                  $(".submit").attr("disabled", true);
                }
            });

            // Initialize Masked Inputs
            // a - Represents an alpha character (A-Z,a-z)
            // 9 - Represents a numeric character (0-9)
            // * - Represents an alphanumeric character (A-Z,a-z,0-9)
            $('#masked_date').mask('99/99/9999');
            $('#masked_date2').mask('99-99-9999');
            $('#masked_phone').mask('(999) 999-9999');
            $('#masked_phone_ext').mask('(999) 999-9999? x99999');
            $('#masked_taxid').mask('99-9999999');
            $('#masked_ssn').mask('999-99-9999');
            $('#masked_pkey').mask('a*-999-a999');

          $('#form-validation input').on('keyup blur', function () {
            if ($('#form-validation').valid()) {
              $('button.submit').prop('disabled', false);
            } else {
              $('button.submit').prop('disabled', "disabled");
            }
          });

          $('#form-validation select').on('change', function () {
            if ($('#form-validation').valid()) {
              $('button.submit').prop('disabled', false);
            } else {
              $('button.submit').prop('disabled', "disabled");
            }
          });
        },

      init2: function() {
        /*
         *  Jquery Validation, Check out more examples and documentation at https://github.com/jzaefferer/jquery-validation
         */

        /* Initialize Form Validation */
        $('#form-validation-edit').validate({
          errorClass: 'help-block animation-slideDown', // You can change the animation class for a different entrance animation - check animations page
          errorElement: 'div',
          errorPlacement: function(error, e) {
            e.parents('.form-group > div').append(error);
          },
          highlight: function(e) {
            $(e).closest('.form-group').removeClass('has-success has-error').addClass('has-error');
            $(e).closest('.help-block').remove();
          },
          success: function(e) {
            // You can use the following if you would like to highlight with green color the input after successful validation!
            e.closest('.form-group').removeClass('has-success has-error'); // e.closest('.form-group').removeClass('has-success has-error').addClass('has-success');
            e.closest('.help-block').remove();
          },
          rules: {
            val_name_edit: {
              required: true,
              minlength: 3
            },
            val_fullname_edit: {
              required: true,
              minlength: 3
            },
            val_email: {
              required: true,
              email: true
            },
            val_password_edit: {
              required: true,
              minlength: 5
            },
            val_confirm_password_edit: {
              required: true,
              equalTo: '#val_password_edit'
            },
            val_bio: {
              required: true,
              minlength: 5
            },
            val_skill: {
              required: true
            },
            val_sites_edit: {
              required: true
            },
            val_permission_edit: {
              required: true
            },
            val_website: {
              required: true,
              url: true
            },
            val_digits: {
              required: true,
              digits: true
            },
            val_number: {
              required: true,
              number: true
            },
            val_range: {
              required: true,
              range: [1, 1000]
            },
            val_terms: {
              required: true
            }
          },
          messages: {
            val_name_edit: {
              required: 'Please enter a name',
              minlength: 'Your name must consist of at least 3 characters'
            },
            val_fullname_edit: {
              required: 'Please enter a fullname',
              minlength: 'Your fullname must consist of at least 3 characters'
            },
            val_email: 'Please enter a valid email address',
            val_password_edit: {
              required: 'Please provide a password',
              minlength: 'Your password must be at least 5 characters long'
            },
            val_confirm_password_edit: {
              required: 'Please provide a password',
              minlength: 'Your password must be at least 5 characters long',
              equalTo: 'Please enter the same password as above'
            },
            val_bio: 'Don\'t be shy, share something with us :-)',
            val_skill: 'Please select a skill!',
            val_sites_edit: 'Please select a site',
            val_permission_edit: 'Please select permission',
            val_website: 'Please enter your website!',
            val_digits: 'Please enter only digits!',
            val_number: 'Please enter a number!',
            val_range: 'Please enter a number between 1 and 1000!',
            val_terms: 'You must agree to the service terms!'
          },
          submitHandler: function(form) {
            $(".submit").attr("disabled", true);
          }
        });

        // Initialize Masked Inputs
        // a - Represents an alpha character (A-Z,a-z)
        // 9 - Represents a numeric character (0-9)
        // * - Represents an alphanumeric character (A-Z,a-z,0-9)
        $('#masked_date').mask('99/99/9999');
        $('#masked_date2').mask('99-99-9999');
        $('#masked_phone').mask('(999) 999-9999');
        $('#masked_phone_ext').mask('(999) 999-9999? x99999');
        $('#masked_taxid').mask('99-9999999');
        $('#masked_ssn').mask('999-99-9999');
        $('#masked_pkey').mask('a*-999-a999');

        $('#form-validation-edit input').on('keyup blur', function () {
          if ($('#form-validation-edit').valid()) {
            $('button.submit').prop('disabled', false);
          } else {
            $('button.submit').prop('disabled', "disabled");
          }
        });

        $('#form-validation-edit select').on('change', function () {
          if ($('#form-validation-edit').valid()) {
            $('button.submit').prop('disabled', false);
          } else {
            $('button.submit').prop('disabled', "disabled");
          }
        });
      },

      init3: function() {
        /*
         *  Jquery Validation, Check out more examples and documentation at https://github.com/jzaefferer/jquery-validation
         */

        /* Initialize Form Validation */
        $('#modal-user-edit-area').validate({
          errorClass: 'help-block animation-slideDown', // You can change the animation class for a different entrance animation - check animations page
          errorElement: 'div',
          errorPlacement: function(error, e) {
            e.parents('.form-group > div').append(error);
          },
          highlight: function(e) {
            $(e).closest('.form-group').removeClass('has-success has-error').addClass('has-error');
            $(e).closest('.help-block').remove();
          },
          success: function(e) {
            // You can use the following if you would like to highlight with green color the input after successful validation!
            e.closest('.form-group').removeClass('has-success has-error'); // e.closest('.form-group').removeClass('has-success has-error').addClass('has-success');
            e.closest('.help-block').remove();
          },
          rules: {
            val_name: {
              required: true,
              minlength: 3
            },
            val_fullname: {
              required: true,
              minlength: 3
            },
            val_email: {
              required: true,
              email: true
            },
            val_password_edit: {
              required: true,
              minlength: 5
            },
            val_confirm_password_edit: {
              required: true,
              equalTo: '#val_password_edit'
            },
            val_bio: {
              required: true,
              minlength: 5
            },
            val_skill: {
              required: true
            },
            val_sites: {
              required: true
            },
            val_permission: {
              required: true
            },
            val_website: {
              required: true,
              url: true
            },
            val_digits: {
              required: true,
              digits: true
            },
            val_number: {
              required: true,
              number: true
            },
            val_range: {
              required: true,
              range: [1, 1000]
            },
            val_terms: {
              required: true
            }
          },
          messages: {
            val_name: {
              required: 'Please enter a name',
              minlength: 'Your name must consist of at least 3 characters'
            },
            val_fullname: {
              required: 'Please enter a fullname',
              minlength: 'Your fullname must consist of at least 3 characters'
            },
            val_email: 'Please enter a valid email address',
            val_password_edit: {
              required: 'Please provide a password',
              minlength: 'Your password must be at least 5 characters long'
            },
            val_confirm_password_edit: {
              required: 'Please provide a password',
              minlength: 'Your password must be at least 5 characters long',
              equalTo: 'Please enter the same password as above'
            },
            val_bio: 'Don\'t be shy, share something with us :-)',
            val_skill: 'Please select a skill!',
            val_sites: 'Please select a site',
            val_permission: 'Please select permission',
            val_website: 'Please enter your website!',
            val_digits: 'Please enter only digits!',
            val_number: 'Please enter a number!',
            val_range: 'Please enter a number between 1 and 1000!',
            val_terms: 'You must agree to the service terms!'
          },
          submitHandler: function(form) {
            $(".submit").attr("disabled", true);
          }
        });

        // Initialize Masked Inputs
        // a - Represents an alpha character (A-Z,a-z)
        // 9 - Represents a numeric character (0-9)
        // * - Represents an alphanumeric character (A-Z,a-z,0-9)
        $('#masked_date').mask('99/99/9999');
        $('#masked_date2').mask('99-99-9999');
        $('#masked_phone').mask('(999) 999-9999');
        $('#masked_phone_ext').mask('(999) 999-9999? x99999');
        $('#masked_taxid').mask('99-9999999');
        $('#masked_ssn').mask('999-99-9999');
        $('#masked_pkey').mask('a*-999-a999');

        $('#modal-user-edit-area input').on('keyup blur', function () {
          if ($('#modal-user-edit-area').valid()) {
            $('button.submit').prop('disabled', false);
          } else {
            $('button.submit').prop('disabled', "disabled");
          }
        });

        $('#modal-user-edit-area select').on('change', function () {
          if ($('#modal-user-edit-area').valid()) {
            $('button.submit').prop('disabled', false);
          } else {
            $('button.submit').prop('disabled', "disabled");
          }
        });
      }
    };
}();
