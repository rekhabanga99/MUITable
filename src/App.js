import logo from './logo.svg';
import './App.css';

import * as React from 'react';
import { DataGrid } from '@material-ui/data-grid';
import { Component } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';


const columns = [
  { field: 'id', headerName: 'Id', width: 90 },
  {
    field: 'name',
    headerName: 'Beat no.',
    width: 150,
    // editable: true,
  },
  {
    field: 'delGuy',
    headerName: 'Del Guy.',
    width: 160,
    // editable: true,
  },
  {

      field: 'date',
    headerName: 'Date',
    width: 160,
    // editable: true,
  },
  {
    field: 'salesPerson',
    headerName: 'Sales Person',
    sortable: false,
    width: 160,
  },
  {
    field: 'instantPay',
    headerName: 'Instant Pay',
    sortable: false,
    width: 110,
  },
  {
    field: 'mode',
    headerName: 'Mode',
    sortable: false,
    width: 160,
  },


  {
    field: 'laterPay',
    headerName: 'Later pay',
    sortable: false,
    width: 160,

  },

  {
    field: 'orderDate',
    headerName: 'order_date',
    sortable: false,
    width: 160,
  },

  {
    field: 'status',
    headerName: 'status',
    sortable: false,
    width: 160,
  },


 
];




 class DataTable extends Component {
   constructor(props) {
    super(props);
    this.state={
      error:'',
      filtered: [],
      loading:true,
     }
  }




  
   componentDidMount(){
    fetch(" https://stage.backend.eggoz.in/sales/export/?warehouse=1&to_delivery_date=11/7/2021&from_delivery_date=9/7/2021")
    .then(res => res.json())
    .then(
      (result) => {

        this.setState({
          loading:false,
          items:  result.results.map(function (obj,index) { 
            return {
            id : index,
            name:obj['Beat no.'],
            delGuy:obj['Del. Guy'],
            date:obj['Date'],
            partyName:obj['Party Name'],
            salesPerson:obj['Sales Person'],
            instantPay:obj["Instant Pay"],
            mode:obj["Mode"],

            accountPay:obj["Acc pay"],
            laterPay:obj["Later pay"],
            orderDate:new Date(obj["order_date"]),
            status:obj['status']
            }
         })
       
        });

      //  var arrOfObj = [{name: 'eve'},{name:'john'},{name:'jane'}];
      
        console.log('Items are',this.state.items)
      },

      (error) => {
        this.setState({
          loading: false,
          error
        });
      }
    )
    
   }
   render(){
    return (
      <div style={{ height:600, width: '100%' }}>
      <div class="header">Filtering and sorting</div>

        <DataGrid
        // filterModel={this.state.filterModel}
        filterModel={{
          items: [
            { columnField: 'delGuy',
              operatorValue: 'contains', 
              value: 'mukund' },
          ],
        }}
        // onFilterModelChange={(model) => this.onFilteredChangeCustom(model)}
          rows={this.state.items?this.state.items:[]}
          columns={columns}
          loading={this.state.loading}
          pageSize={10}
          checkboxSelection
          disableSelectionOnClick
        />
      </div>
    );
   }

}

export default DataTable;