const response = {};
//var nodeExcel=require('excel-export');
//var excel = require('exceljs');
// var dateFormat = require('dateformat');

response.handleResponse = (err, data, res)=> {
    var response_data = {};
    if(err) {
        response_data = {
            "status" : "failure",
            "data" : err || "Unexpected error found"
        };
    } else {
        response_data = {
            "status" : "success",
            "data" : data
        };
    }
    res.status(200).set('Content-Type', 'application/json').json(response_data);
}

// response.exportExcel  = (err,data,res) => {
//     var response_data = {};
//     if(err) {
//         response_data = {
//             "status" : "failure",
//             "data" : err || "Unexpected error found"
//         };
//     } else {
//         response_data = {
//             "status" : "success",
//             "data" : data
//         };
//     }
//     var conf={}
//     conf.cols=[{
//             caption:'Sl.',
//             type:'number',
//             width:3
//         },
//         {
//             caption:'Job',
//             type:'string',
//             width:50
//         },
//         {
//             caption:'Date',
//             type:'string',
//             width:15
//         }
//         ];
//         var arr = [];
//         for(i=0;i<10;i++){
//             job= "soft".i;
//             date = "2020-01-13";
//             dd = "dfsdfasdfasf";
//             a=[i+1,job,dd];
//             arr.push(a);
//         }
//         conf.rows=arr;
//         var jsonArr = [{
//             foo: 'bar',
//             qux: 'moo',
//             poo: 123,
//             stux: new Date()
//         },
//         {
//             foo: 'bar',
//             qux: 'moo',
//             poo: 345,
//             stux: new Date()
//         }];
//         console.log('jsonArr', jsonArr)
//         res.xls('data.xlsx', jsonArr);

//     // var result=nodeExcel.execute(conf);
//     // res.setHeader('Content-Type', 'application/vnd.openxmlformats');
//     // res.setHeader("Content-Disposition", "attachment; filename=" + 
//     // "Report.xlsx");
//     // res.writeHead(200);
//     // res.end(result, 'binary');
//     // var filePath = "/"; // Or format the path using the `id` rest param
//     // var fileName = "document.pdf"; // The default name the browser will use

//     // res.download('document.pdf', 'report.pdf', function (err) {
//     //     if (err) {
//     //         console.log(err);
//     //       // Handle error, but keep in mind the response may be partially-sent
//     //       // so check res.headersSent
//     //     } else {
//     //       // decrement a download credit, etc.
//     //     }
//     //   });
//     //res.status(200).set('Content-Type', 'application/json').json(response_data);
// }


module.exports = response;