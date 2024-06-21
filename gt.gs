//--------------------------------------------------------------This is used for IGTa/e Search Tool-------------------------------------------------------------------
function dataUpdatingGT() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("iGT");
  var sheetData = sheet.getRange(1, 14, sheet.getLastRow(), 1).getValues();
  var sheetFlatData = sheetData.flat(1);
  var query =
    'query{\n\topportunities(\n\t\tfilters:{\n\t\t\tprogrammes:[9,8]\n\t\t\tcommittee:1609\n\t\t\tdate_opened:{from:"01/07/2022"}\n\t\t}\n\t\tper_page:4000\n\t)\n\t{\n\t\tpaging{\n\t\t\ttotal_items\n\t\t}\n\t\tdata{\n\t\t\tid\nlogistics_info{\n\t\t\t\taccommodation_covered\n\t\t\t\taccommodation_provided\n\t\t\t\tcomputer_provided\n\t\t\t\tfood_covered\n\t\t\t\tfood_provided\n\t\t\t\ttransportation_covered\n\t\t\t\ttransportation_provided\n\t\t\t}\t\t\ttitle\n\t\t\tbranch{\n\t\t\t\tcompany{\n\t\t\t\t\tname\n\t\t\t\t}\n\t\t\t}\n\t\t\tprogramme{\n\t\t\t\tshort_name_display\n\t\t\t}\nsub_product{\n\t\t\t\tname\n\t\t\t}\t\t\thome_lc{\n\t\t\t\tname\n\t\t\t}\n\t\t\tstatus\n\t\t\tcreated_at\n\t\t\tdate_opened\n\t\t\tapplicants_count\norganisation{\n\t\t\t\tname\n\t\t\t}\n\t\t\tspecifics_info{\n\t\t\t\tsalary\n\t\t\t\tsalary_currency{\n\t\t\t\t\talphabetic_code\n\t\t\t\t}\n\t\t\t}\n\t\t\t\n\t\t\tbackgrounds{\n\t\t\t\tconstant_name\n\t\t\t}\n\t\t\t\n\n\topportunity_duration_type{\n\t\t\t\tduration_type\n\t\t\t}\n\t\taccepted_count\n\t\t\tslots{\n\t\t\t\tid\n\t\t\t\tstatus\n\t\t\t\tcreated_at\n\t\t\t\topenings\n\t\t\t\tavailable_openings\n\t\t\t\tstart_date\n\t\t\t\tend_date\n\t\t\t}\n\t\t\tavailable_slots{\n\t\t\t\tid\n\t\t\t}\n\t\t}\n\t}\n}';
  var data = dataExtraction(query);
  for (let i = 0; i < data.length; i++) {
    Logger.log(i);
    for (let j = 0; j < data[i].slots.length; j++) {
      var rowIndex = sheetFlatData.indexOf(parseInt(data[i].slots[j].id));
      if (rowIndex == -1) {
        var newRows = [];
        newRows.push([
          data[i].id,
          data[i].title,
          data[i].programme.short_name_display == "GTa"
            ? "https://aiesec.org/opportunity/global-talent/" + data[i].id
            : "https://aiesec.org/opportunity/global-teacher/" + data[i].id,
          data[i].branch.company.name,
          data[i].programme.short_name_display == "GTa"
            ? "Global Talent"
            : "Global Teacher",
          data[i].sub_product != null ? data[i].sub_product.name : "Education",
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
          data[i].logistics_info.computer_provided.replace("_", " "),
          data[i].logistics_info.accommodation_covered.replace("_", " ") +
            " & " +
            data[i].logistics_info.accommodation_provided.replace("_", " "),
          data[i].logistics_info.food_covered.replace("_", " ") +
            " & " +
            data[i].logistics_info.food_provided.replace("_", " "),
          data[i].logistics_info.transportation_covered.replace("_", " ") +
            " & " +
            data[i].logistics_info.transportation_provided.replace("_", " "),
          data[i].organisation.name,
          data[i].specifics_info.salary == null
            ? ""
            : data[i].specifics_info.salary +
              " " +
              data[i].specifics_info.salary_currency.alphabetic_code,
          getBackgrouns(data[i].backgrounds),
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
        Logger.log(i);
        row.push([
          data[i].id,
          data[i].title,
          data[i].programme.short_name_display == "GTa"
            ? "https://aiesec.org/opportunity/global-talent/" + data[i].id
            : "https://aiesec.org/opportunity/global-teacher/" + data[i].id,
          data[i].branch.company.name,
          data[i].programme.short_name_display == "GTa"
            ? "Global Talent"
            : "Global Teacher",
          data[i].sub_product != null ? data[i].sub_product.name : "Education",
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
          data[i].logistics_info.computer_provided.replace("_", " "),
          data[i].logistics_info.accommodation_covered.replace("_", " ") +
            " & " +
            data[i].logistics_info.accommodation_provided.replace("_", " "),
          data[i].logistics_info.food_covered.replace("_", " ") +
            " & " +
            data[i].logistics_info.food_provided.replace("_", " "),
          data[i].logistics_info.transportation_covered.replace("_", " ") +
            " & " +
            data[i].logistics_info.transportation_provided.replace("_", " "),
          data[i].organisation.name,
          data[i].specifics_info.salary == null
            ? ""
            : data[i].specifics_info.salary +
              " " +
              data[i].specifics_info.salary_currency.alphabetic_code,
          getBackgrouns(data[i].backgrounds),
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
