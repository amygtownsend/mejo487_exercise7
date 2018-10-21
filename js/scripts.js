$(document).ready(function(){
  console.log('scripts loaded');

  /*
  1) Build an HTML table using an AJAX call on the provided XML file (NEH_Grants2010s.xml).
     The XML data shows all of the grants awarded by the National Endowment for the Humanities since 2008.
  2) The table should have four columns:
      The Project Title, Year Awarded, Original Amount, and grant description (ToSupport)
  3) You will notice that the table is a bit messy; some of the grants have no descriptions, leaving large
     blank spaces with just 'None.' Clean this up with conditional logic in your code.
     If the grant has no description, do not include it in the table.
  */

  var grants;
  var html = '';
  var url = '../NEH_Grants2010s.xml';
  var projectTitle = '';
  var yearAwarded = '';
  var originalAmount = '';
  var description = '';

  $.ajax({
    type: 'GET',
    url: url,
    data: grants,
    dataType: 'xml',
    async: true,
    success: function(grants){
      console.log(grants);
      // Add table headings
      html += '<tr><th>Project Title</th><th>Year Awarded</th><th>Original Amount</th><th>Grant Description</th></tr>';
      // Execute the following function for each "Grant" xml tag
      $(grants).find('Grant').each(function(){
        // Assign the text within each xml tag to corresponding variables
        projectTitle = $(this).find('ProjectTitle').text();
        yearAwarded = $(this).find('YearAwarded').text();
        originalAmount = $(this).find('OriginalAmount').text();
        description = $(this).find('ProjectDesc').text();
        console.log(projectTitle + ' ' + yearAwarded + ' ' + originalAmount + ' ' + description);
        // Add table rows
        if (description === 'None') {
          // If description is "None," leave Grant Description column empty
          html += '<tr><td>' + projectTitle + '</td><td>' + yearAwarded + '</td><td>' + originalAmount + '</td><td></td></tr>';
        } else {
          // Otherwise, include description in Grant Description column
          html += '<tr><td>' + projectTitle + '</td><td>' + yearAwarded + '</td><td>' + originalAmount + '</td><td>' + description + '</td></tr>';
        }
      });

      // Append content above to inner html of the #results table
      $('#results').append(html);
    }
  });
});
