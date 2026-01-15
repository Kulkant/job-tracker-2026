import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import { Container } from "react-bootstrap";

const ChartsContainer = ({ monthlyApplications }) => {
  return (
    <Container>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={monthlyApplications}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Bar dataKey="count" fill="2c1bc" />
        </BarChart>
      </ResponsiveContainer>
    </Container>
  );
};

export default ChartsContainer;
