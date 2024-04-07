import React from 'react';

const renderApprovalList = (approvals) => {
  // Step 1: Sort the data
  const sortedApprovals = approvals.sort((a, b) => b.timestamp - a.timestamp);

  // Step 2: Group the data by day
  const groupedApprovals = sortedApprovals.reduce((acc, approval) => {
    const approvalDate = new Date(approval.timestamp).toLocaleDateString();
    acc[approvalDate] = acc[approvalDate] || [];
    acc[approvalDate].push(approval);
    return acc;
  }, {});

  // Step 3: Render UI components
  return Object.keys(groupedApprovals).map((day) => ({
    day,
    data: groupedApprovals[day],
  }));
};

export default renderApprovalList;
