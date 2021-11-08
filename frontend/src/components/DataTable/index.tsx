import axios from "axios";
import Pagination from "components/Pagination";
import { useEffect, useState } from "react";
import { SalePage } from "types/sale";
// import { formatLocalDate } from "utils/format";
import { BASE_URL } from "utils/requests";


const DataTable = () => {

    const [activePage, setActivePage] = useState(0)
    const [page, setPage] = useState<SalePage>({
        first: true,
        last: true,
        number: 0,
        totalElements: 0,
        totalPages: 0
    })

    useEffect(() => {
        axios.get(`${BASE_URL}/api/sales?page=${activePage}&size=10&sort=date,desc`)
            .then(response => {
                setPage(response.data)
            });
    }, [activePage]);

    const changePage = (index: number) => {
        setActivePage(index);
    }


    return (
        <>
            <Pagination page={page} onPageChange={changePage} />
            <div className="table-responsive">
                <table className="table table-striped table-sm">
                    <thead>
                        <tr>
                            <th>Data</th>
                            <th>Vendedor</th>
                            <th>Clientes visitados</th>
                            <th>Negócios fechados</th>
                            <th>Valor</th>
                        </tr>
                    </thead>
                    <tbody>
                        {page.content?.map(item => (
                            <tr key={item.id}>
                                <td>{item.date}</td>
                                <td>{item.seller.name}n</td>
                                <td>{item.visited}</td>
                                <td>{item.deals}</td>
                                <td>{item.amount.toFixed(2)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default DataTable;
function formatLocalDate(date: string, arg1: string): import("react").ReactNode {
    throw new Error("Function not implemented.");
}

