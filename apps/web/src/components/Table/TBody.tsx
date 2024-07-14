import { Box, TableBody } from "@mui/material";

import TRow from "./TRow";
import { TableData, Header, TBodyProps, TRowProps } from "./types";

interface Props<K extends string> {
  data: TableData<K>;
  headers: Header;
  rowSpacing?: string;
  tBody?: TBodyProps;
  tCellClassnames?: string;
  tRowProps?: TRowProps;
}

function TBody<K extends string>({
  data,
  headers,
  rowSpacing,
  tBody,
  tCellClassnames,
  tRowProps,
}: Props<K>) {
  return (
    <TableBody {...tBody}>
      {data.map((row, index) => (
        <>
          {rowSpacing && <Box mt={rowSpacing} />}

          <TRow
            tCellClassnames={tCellClassnames}
            key={index}
            headers={headers}
            row={row}
            {...tRowProps}
          />
        </>
      ))}
    </TableBody>
  );
}

export default TBody;
