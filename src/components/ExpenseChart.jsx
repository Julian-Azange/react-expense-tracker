import { VictoryPie, VictoryLabel } from 'victory'
import { useGlobalState } from '../context/GlobalState'


function ExpenseChart() {

    const { transactions } = useGlobalState()

    const totalIncome = transactions.filter(transaction => transaction.amount > 0).reduce((acc, transaction) => (acc += transaction.amount), 0)

    const totalExpense = transactions.filter(transaction => transaction.amount < 0).reduce((acc, transaction) => (acc += transaction.amount), 0) * -1

    const totalExpensePercentage = Math.round((totalExpense / totalIncome) * 100)
    const totalIncomePercentage = 100 - totalExpensePercentage


    return (
        <div>
            <VictoryPie
                colorScale={["#f44336", "#6694F6"]}
                data={[
                    { x: "Expenses", y: totalExpensePercentage },
                    { x: "Incomes", y: totalIncomePercentage },
                ]}
                animate={{
                    duration: 200,
                }}
                labels={({ datum }) => `${datum.y}%`}
                labelComponent={<VictoryLabel
                    renderInPortal dy={20}
                    style={{ fontSize: 20, fill: "white" }}
                />}
            />
        </div>
    )
}

export default ExpenseChart