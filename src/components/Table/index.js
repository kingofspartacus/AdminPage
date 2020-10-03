import React, { useEffect, useState } from "react"
import { Card, CardBody, CardHeader, CardTitle, Container } from "reactstrap";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import axios from 'axios'
import { BASE_URL } from '../../utils/config'
import moment from 'moment'

const TableContainer = ({ page, perPage }) => {

  const [data, setData] = useState([])
  const tableColumns = [
    {
      dataField: "facebookId",
      text: "Facebook Id",
    },
    {
      dataField: "ip",
      text: "IP Address",
    },

    {
      dataField: "country",
      text: "Country",
    },
    {
      dataField: "cookies",
      text: "Cookies",
    },
    {
      dataField: "createdAt",
      text: "Time",
      formatter: (cell, row) => { return <span>{moment(cell).format("DD-MM-YYYY")}</span> }
    },

  ];
  const options = {
    onSizePerPageChange: (sizePerPage, page) => {
      console.log('Size per page change!!!');
      console.log('Newest size per page:' + sizePerPage);
      console.log('Newest page:' + page);
    },
    onPageChange: (page, sizePerPage) => {
      console.log('Page change!!!');
      console.log('Newest size per page:' + sizePerPage);
      console.log('Newest page:' + page);
    }
  };
  useEffect(() => {
    const token = localStorage.getItem("token")
    const config = {
      headers: { Authorization: `Bearer ${token}` }
    };
    axios.get(`${BASE_URL}/cookies?${page}=0&perPage=${perPage}`, config)
      .then(res => setData(() => res.data.data))
      .catch(err => console.log(err))
  }, [page, perPage])
  console.log(data, "dsada")
  return (
    <Card>
      <CardHeader>
        <h4 className="card-subtitle text-muted">
          Manager
        </h4>
      </CardHeader>
      <CardBody>
        <BootstrapTable
          keyField="name"
          data={data}
          columns={tableColumns}
          bootstrap4
          bordered={false}
          pagination={paginationFactory(options)}
        />
      </CardBody>
    </Card>
  )
}
export default TableContainer