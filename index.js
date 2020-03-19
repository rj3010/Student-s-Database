/** @format */

var sortableArr = [];
var data;
var students = [];
window.addEventListener("load", function() {
  var xhr = new XMLHttpRequest();
  xhr.open("GET", "/data.json");
  xhr.onload = function() {
    if (xhr.status == 200) {
      data = xhr.response;
      students.push(JSON.parse(data));
      calculateTotal(students);
      // totalMarksAddedInRecord(students);
    } else {
      console.log(xhr.responseText);
    }
  };
  xhr.send();
});
console.log(students);

//
const createPaginationLink = selectRecord => {
  $("#paginationLink").empty();
  var ul = document.createElement("ul");
  ul.setAttribute("class", "pagination justify-content-center");
  for (let i = 1; i <= 100 / selectRecord; i++) {
    var lis = document.createElement("li");
    lis.setAttribute("class", "page-item");
    var button = document.createElement("button");
    button.setAttribute("class", "page-link");
    button.setAttribute("value", i);
    button.innerHTML = `${i}`;
    button.addEventListener("click", changePage);
    lis.appendChild(button);
    ul.appendChild(lis);
  }
  $("#paginationLink").append(ul);
};
$("#selectRecord").change(function() {
  var selectRecord = $("#selectRecord").val();
  if (selectRecord == 100) {
    createTableRow(students, 0, 100);
  }

  createPaginationLink(selectRecord);
});

function changePage() {
  var selectValue = $("#selectRecord").val();
  var pageValue = event.target.value;

  createTableRow(
    students,
    (pageValue - 1) * selectValue,
    pageValue * selectValue
  );
}
$("#searchBy").on("keyup", function() {
  var value = $(this)
    .val()
    .toLowerCase();
  $("#myTable tr").filter(function() {
    $(this).toggle(
      $(this)
        .text()
        .toLowerCase()
        .indexOf(value) > -1
    );
  });
});

$("th").on("click", function(e) {
  var id = e.target.id;
  console.log(id);
  var newArr = sortDsc(sortableArr, id);
  createSortedTableRow(newArr, 0, newArr.length);
});
$("th").on("dblclick", function(e) {
  // alert();
  var id = e.target.id;
  var newArr = sortAsc(sortableArr, id);
  createSortedTableRow(newArr, 0, newArr.length);
});

function sortDsc(arr, id) {
  if (id == maths || id == science || id == english || id == total) {
    arr.sort(function(a, b) {
      return b - a;
    });
    return arr;
  }
  arr.sort(function(a, b) {
    if (a[id] > b[id]) {
      return -1;
    }
    if (a[id] < b[id]) {
      return 1;
    } else {
      return 0;
    }
  });
  return arr;
}

function sortAsc(arr, id) {
  if (id == maths || id == science || id == english || id == total) {
    arr.sort(function(a, b) {
      return a - b;
    });
    return arr;
  }
  arr.sort(function(a, b) {
    if (a[id] < b[id]) {
      return -1;
    }
    if (a[id] > b[id]) {
      return 1;
    } else {
      return 0;
    }
  });
  return arr;
}

function calculateTotal(arr) {
  for (let i = 0; i < arr[0].length; i++) {
    var total = arr[0][i].english + arr[0][i].maths + arr[0][i].science;
    arr[0][i].total = total;
  }
  // console.log(arr[0]);
}
fun
function createTableRow(studentData, index1, index2) {
  $("#userDataTable").empty();
  console.log(studentData);
  sortableArr = [];
  for (let i = index1; i < index2; i++) {
    $("#userDataTable").append(
      `<tr><td> ${studentData[0][i].id}</td><td> ${studentData[0][i].first_name}</td><td> ${studentData[0][i].last_name}</td><td> ${studentData[0][i].email}</td><td> ${studentData[0][i].gender}</td><td> ${studentData[0][i].english}</td><td> ${studentData[0][i].maths}</td><td> ${studentData[0][i].science}</td><td> ${studentData[0][i].total}</td></tr>`
    );
    sortableArr.push(students[0][i]);
  }
}

function createSortedTableRow(arr, index1, index2) {
  $("#userDataTable").empty();
  for (let i = index1; i < index2; i++) {
    $("#userDataTable").append(
      `<tr><td> ${arr[i].id}</td><td> ${arr[i].first_name}</td><td> ${arr[i].last_name}</td><td> ${arr[i].email}</td><td> ${arr[i].gender}</td><td> ${arr[i].total}</td><td> ${arr[i].maths}</td><td> ${arr[i].science}</td><td> ${arr[i].total}</td></tr>`
    );
  }
}
