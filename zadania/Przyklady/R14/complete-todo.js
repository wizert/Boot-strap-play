$(document).ready(function(e) {

  // Tworzymy przycisk i dodajemy jego możliwości funkcjonalne.
  $("#add-todo").button({
    icons: {
      primary: "ui-icon-circle-plus"
    }
  }).click(function() {
    $("#new-todo").dialog('open');
  }); // Koniec funkcji click.

  // Tworzymy okno dialogowe i określamy jego możliwości funkcjonalne.
  $("#new-todo").dialog({
    modal: true,
    autoOpen: false,
    buttons : {
      "Dodaj zadanie" : function() {
        var taskName = $('#task').val();
        if (taskName === '') {
          return false;
        } 
        var taskHTML = '<li><span class="done">%</span>';
        taskHTML += '<span class="delete">x</span>';
        taskHTML += '<span class="task"></span></li>';

        // Konwertujemy łańcuch z kodem HTML do obiektu jQuery. 
        var $newTask = $(taskHTML);

        // Dodajemy nazwę zadania upewniając się przy tym, że kod  
        // HTML jest odpowiednio zapisany.
        $newTask.find('.task').text(taskName);

        // Ukrywamy nowe zadanie. 
        $newTask.hide();

        // Dopisujemy nowe zadanie do listy.
        $('#todo-list').prepend($newTask);

        // Wyświetlamy je z użyciem efektu animacji i podświetlamy.
        $newTask.show('clip',250).effect('highlight',1000);
        $(this).dialog('close');
      },
      "Anuluj" : function() {
        $(this).dialog('close');
      }
    },
    close: function() {
          $('#new-todo input').val(''); /* Czyścimy pola. */
    }
  }); // Koniec funkcji dialog.
  
  // Oznaczenie zadania jako wykonanego.
  $("#todo-list").on('click','.done', function() {
    var $taskItem = $(this).parent('li');
    $taskItem.slideUp(250, function() {
      var $this = $(this);
      $this.detach();
      $('#completed-list').prepend($this);
      $this.slideDown();
    });
  }); // Koniec funkcji on.

  // Zapewniamy możliwość sortowania obu list.
  $('.sortlist').sortable({
    connectWith : '.sortlist',
    cursor : 'pointer',
    placeholder : 'ui-state-highlight',
    cancel : '.delete,.done'
  }); // Koniec funkcji sortable.
  
  // Usuwamy element listy.
  $('.sortlist').on('click','.delete',function() {
    $(this).parent('li').effect('puff', function() {
      $(this).remove();
    }); // Koniec funkcji effect.
  }); // Koniec funkcji on.

    
}); // Koniec funkcji ready.