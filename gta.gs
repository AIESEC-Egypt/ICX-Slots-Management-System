function dataUpdatingGTa() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("iGTa");
  var sheetData = sheet.getRange(1, 12, sheet.getLastRow(), 1).getValues();
  var sheetFlatData = sheetData.flat(1);
  var query =
    'query{\n\topportunities(\n\t\tfilters:{\n\t\t\tprogrammes:[8]\n\t\t\tcommittee:1609\n\t\t\tdate_opened:{from:"01/07/2022"}\n\t\t}\n\t\tper_page:4000\n\t)\n\t{\n\t\tpaging{\n\t\t\ttotal_items\n\t\t}\n\t\tdata{\n\t\t\tid\n\t\t\ttitle\n\t\t\tbranch{\n\t\t\t\tcompany{\n\t\t\t\t\tname\n\t\t\t\t}\n\t\t\t}\n\t\t\tsub_product{\n\t\t\tname\n\t\t\t}\n\t\t\tprogramme{\n\t\t\t\tshort_name_display\n\t\t\t}\n\t\t\thome_lc{\n\t\t\t\tname\n\t\t\t}\n\t\t\tstatus\n\t\t\tcreated_at\n\t\t\tdate_opened\n\t\t\tapplicants_count\n\topportunity_duration_type{\n\t\t\t\tduration_type\n\t\t\t}\n\t\taccepted_count\n\t\t\tslots{\n\t\t\t\tid\n\t\t\t\tstatus\n\t\t\t\tcreated_at\n\t\t\t\topenings\n\t\t\t\tavailable_openings\n\t\t\t\tstart_date\n\t\t\t\tend_date\n\t\t\t}\n\t\t\tavailable_slots{\n\t\t\t\tid\n\t\t\t}\n\t\t}\n\t}\n}';
  var data = dataExtraction(query);
  for (let i = 0; i < data.length; i++) {
    for (let j = 0; j < data[i].slots.length; j++) {
      var rowIndex = sheetFlatData.indexOf(parseInt(data[i].slots[j].id));
      if (rowIndex < 0) {
        Logger.log("new");
        var newRows = [];
        newRows.push([
          data[i].id,
          data[i].title,
          data[i].sub_product.name,
          data[i].branch.company.name,
          data[i].programme.short_name_display,
          data[i].home_lc.name,
          data[i].status,
          data[i].created_at != null
            ? data[i].created_at.toString().substring(0, 10)
            : "-",
          data[i].date_opened != null
            ? data[i].date_opened.toString().substring(0, 10)
            : "-",
          data[i].applicants_count,
          data[i].slots.length,
          data[i].available_slots.length,
          data[i].slots[j].id,
          data[i].slots[j].status,
          data[i].slots[j].created_at != null
            ? data[i].slots[j].created_at.toString().substring(0, 10)
            : "-",
          data[i].slots[j].openings,
          data[i].slots[j].available_openings,
          data[i].slots[j].start_date,
          data[i].slots[j].end_date,
          data[i].opportunity_duration_type.duration_type,
        ]);
        sheet
          .getRange(
            sheet.getLastRow() + 1,
            1,
            newRows.length,
            newRows[0].length
          )
          .setValues(newRows);
      } else {
        var row = [];
        Logger.log("existed");
        row.push([
          data[i].id,
          data[i].title,
          data[i].sub_product.name,
          data[i].branch.company.name,
          data[i].programme.short_name_display,
          data[i].home_lc.name,
          data[i].status,
          data[i].created_at != null
            ? data[i].created_at.toString().substring(0, 10)
            : "-",
          data[i].date_opened != null
            ? data[i].date_opened.toString().substring(0, 10)
            : "-",
          data[i].applicants_count,
          data[i].slots.length,
          data[i].available_slots.length,
          data[i].slots[j].id,
          data[i].slots[j].status,
          data[i].slots[j].created_at != null
            ? data[i].slots[j].created_at.toString().substring(0, 10)
            : "-",
          data[i].slots[j].openings,
          data[i].slots[j].available_openings,
          data[i].slots[j].start_date,
          data[i].slots[j].end_date,
          data[i].opportunity_duration_type.duration_type,
        ]);
        sheet
          .getRange(rowIndex + 1, 1, row.length, row[0].length)
          .setValues(row);
      }
    }
  }
  var now = new Date();
  updateDate = sheetInterface.getRange(8, 4).setValue(now);
}
