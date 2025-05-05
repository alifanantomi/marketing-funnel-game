import React from "react";

type EvaluationRow = {
  category: string;
  description: string;
};

type StrategyEvaluationTableProps = {
  data: EvaluationRow[];
};

const StrategyEvaluationTableNoNotes: React.FC<StrategyEvaluationTableProps> = ({ data }) => {
  return (
    <div className="overflow-x-auto py-4">
      <table className="min-w-full table-auto border-2 border-retro-dark rounded-lg">
        <thead>
          <tr className="bg-retro-green text-retro-dark">
            <th className="border-2 border-retro-dark px-4 py-2 text-left">Category</th>
            <th className="border-2 border-retro-dark px-4 py-2 text-left">Description</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index} className="bg-white">
              <td className="border-2 border-retro-dark text-retro-dark font-medium px-4 py-2">{row.category}</td>
              <td className="border-2 border-retro-dark text-retro-dark font-medium px-4 py-2">{row.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StrategyEvaluationTableNoNotes;