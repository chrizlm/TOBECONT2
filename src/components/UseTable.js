import React, {useState} from 'react'
import {Table, TableCell, TableHead, TableRow, TablePagination} from '@mui/material'
import TableSortLabel from '@mui/material/TableSortLabel';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
    table:{
        marginTop: '24px',
        '& thread th' : '600'
    },
    '& tbody td' : {
        fontWeight:'300'
    },
    '& tbody tr:hover':{
        cursor: 'pointer'
    }
})


export default function UseTable(repo, headcells, filterFn){

    const pages =[5, 10, 25]
    const [page, setPage ] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(pages[page])
    const [order, setOrder] = useState();
    const [orderBy, setOrderBy] = useState();

    const classes = useStyles();

    const TablContainer = props =>(
        <Table className = {classes.table}> 
            {props.children}
        </Table>
    )

    const TablHead = props =>{
        const handleSortRequest = cellId =>{
            const isAsc = orderBy === cellId && order === "asc";
            setOrder(isAsc ? 'desc' : 'asc');
            setOrderBy(cellId)
        }
        return(
            <TableHead>
                <TableRow>
                    {
                        headcells.map(headcell =>(
                            <TableCell key={headcell.id}
                            sortDirection={orderBy === headcell.id ? order: false}>
                                {headcell.disableSorting?headcell.label:
                                <TableSortLabel
                                active={orderBy === headcell.id}
                                direction={orderBy === headcell.id ? order : 'asc'}
                                onClick={() => {handleSortRequest(headcell.id)}}>
                                    {headcells.label}
                                    </TableSortLabel>}
                            </TableCell>
                        ))
                    }
                </TableRow>
            </TableHead>
        )
    }

    const handleChangePage = (event, newPage) =>{
        setPage(newPage);
    }

    const handleChangeRowsPerPage = (event) =>{
        setRowsPerPage(parseInt(event.target.value, 10))
        setPage(0)
    }

    const TblPagination = () =>(<TablePagination 
        component="div"
        page = {page}
        rowsPerPageOption = {pages}
        rowsPerPage={rowsPerPage}
        count={repo.length}
        onChangePage={handleChangePage}
        onChangeRowsPerPage = {handleChangeRowsPerPage}
        />)

    function stableSort(array, comparator){
        const stabilizedThis = array.map((el, index) => [el, index]);
        stabilizedThis.sort((a,b) => {
            const order = comparator(a[0], b[0]);
            if(order !==0) return order;
            return a[1]-b[1];
        });
        return stabilizedThis.map((el) => el[0]);
    }

    function getComparator(order, orderBy){
        return order === 'desc'
        ? (a, b) => descendingComparator(a,b, orderBy)
        : (a, b) => -descendingComparator(a,b, orderBy);
    }

    function descendingComparator(a,b, orderBy){
        if(b[orderBy] < a[orderBy]){
            return -1;
        }
        if(b[orderBy > a[orderBy]]){
            return 1;
        }
        return 0;
    }

    const recordsAfterPagingAndSorting = () =>{
        return stableSort(filterFn.fn(repo), getComparator(order, orderBy)).slice(page*rowsPerPage,(page+1)*rowsPerPage)
    }

    return {
        TablContainer,
        TablHead,
        TblPagination,
        recordsAfterPagingAndSorting
    }
}