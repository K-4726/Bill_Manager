import React from "react";
import { Progress, Card } from "antd";
import "../styles/Analytics.css";

const Analytics = ({ allTransection }) => {
  // total transaction
  const totalTransaction = allTransection.length;
  const totalPaidTransactions = allTransection.filter(
    (transaction) => transaction.status === "paid"
  );
  const totalUnpaidTransactions = allTransection.filter(
    (transaction) => transaction.status === "unpaid"
  );
  const totalPaidPercent =
    (totalPaidTransactions.length / totalTransaction) * 100;
  const totalUnpaidPercent =
    (totalUnpaidTransactions.length / totalTransaction) * 100;

  // Total amount paid and unpaid
  const totalAmountPaid = totalPaidTransactions.reduce(
    (acc, transaction) => acc + Number(transaction.amount),
    0
  );
  const totalAmountUnpaid = totalUnpaidTransactions.reduce(
    (acc, transaction) => acc + Number(transaction.amount),
    0
  );

  // Monthly analysis
  const getMonthlyAnalysis = () => {
    const monthlyAnalysis = {};
    allTransection.forEach((transaction) => {
      const month = new Date(transaction.date).getMonth();
      const monthKey = month.toString();
      if (monthlyAnalysis[monthKey]) {
        monthlyAnalysis[monthKey].count += 1;
        monthlyAnalysis[monthKey].amount += Number(transaction.amount);
      } else {
        monthlyAnalysis[monthKey] = {
          count: 1,
          amount: Number(transaction.amount),
        };
      }
    });
    return monthlyAnalysis;
  };

  const monthlyAnalysisData = getMonthlyAnalysis();

  return (
    <>
      <div className="row m-3">
        <div className="col-md-4">
          <Card title="Paid vs Unpaid Transactions">
            <div className="analytics-pie-chart">
              <div className="analytics-pie">
                <div
                  className="analytics-pie-slice"
                  style={{
                    transform: `rotate(${totalPaidPercent * 3.6}deg)`,
                    backgroundColor: "#52c41a",
                  }}
                ></div>
              </div>
              <div className="analytics-pie">
                <div
                  className="analytics-pie-slice"
                  style={{
                    transform: `rotate(${totalUnpaidPercent * 3.6}deg)`,
                    backgroundColor: "#f5222d",
                  }}
                ></div>
              </div>
            </div>
            <div className="analytics-legend">
              <div className="analytics-legend-item">
                <span
                  className="analytics-legend-color"
                  style={{ backgroundColor: "#52c41a" }}
                ></span>
                <span className="analytics-legend-label">Paid</span>
              </div>
              <div className="analytics-legend-item">
                <span
                  className="analytics-legend-color"
                  style={{ backgroundColor: "#f5222d" }}
                ></span>
                <span className="analytics-legend-label">Unpaid</span>
              </div>
            </div>
          </Card>
        </div>
        <div className="col-md-4">
          <Card title="Total Amount Paid">
            <div className="analytics-total-amount">
              <h2>{totalAmountPaid}</h2>
            </div>
          </Card>
        </div>
        <div className="col-md-4">
          <Card title="Total Amount Unpaid">
            <div className="analytics-total-amount">
              <h2>{totalAmountUnpaid}</h2>
            </div>
          </Card>
        </div>
      </div>

      <div className="row m-3">
        <div className="col-md-12">
          <Card title="Monthly Analysis">
            <div className="analytics-monthly">
              {Object.entries(monthlyAnalysisData).map(([month, data]) => (
                <div key={month} className="analytics-monthly-item">
                  <div className="analytics-monthly-label">Month {parseInt(month) + 1}</div>
                  <div className="analytics-monthly-count">{data.count} transactions</div>
                  <div className="analytics-monthly-amount">Ruppess: {data.amount}</div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </>
  );
};

export default Analytics;
