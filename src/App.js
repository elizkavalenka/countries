import React from "react";
import "./index.css";
import "antd/dist/antd.css";
import { Table } from "antd";
import { ApolloClient, InMemoryCache, gql, useQuery } from "@apollo/client";
import ReactCountryFlag from "react-country-flag";

const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri: "https://countries.trevorblades.com"
});

const LIST_COUNTRIES = gql`
  {
    countries {
      name
      code
      continent {
        name
      }
    }
  }
`;

const columns = [
  {
    title: "Name",
    dataIndex: "name",
    onFilter: (value, record) => record.name.indexOf(value) === 0,
    defaultSortOrder: "ascend",
    sorter: (a, b) => a.name.localeCompare(b.name),
    filters: [
      { text: "A", value: "A" },
      { text: "B", value: "B" },
      { text: "C", value: "C" },
      { text: "D", value: "D" },
      { text: "E", value: "E" },
      { text: "F", value: "F" },
      { text: "G", value: "G" },
      { text: "H", value: "H" },
      { text: "I", value: "I" },
      { text: "J", value: "J" },
      { text: "K", value: "K" },
      { text: "L", value: "L" },
      { text: "M", value: "M" },
      { text: "N", value: "N" },
      { text: "O", value: "O" },
      { text: "P", value: "P" },
      { text: "Q", value: "Q" },
      { text: "R", value: "R" },
      { text: "S", value: "S" },
      { text: "T", value: "T" },
      { text: "U", value: "U" },
      { text: "V", value: "V" },
      { text: "W", value: "W" },
      { text: "X", value: "X" },
      { text: "Y", value: "Y" },
      { text: "Z", value: "Z" }
    ]
  },
  {
    title: "Code",
    dataIndex: "code",
    defaultSortOrder: "ascend",
    sorter: (a, b) => a.code.localeCompare(b.code)
  },
  {
    title: "Continent",
    dataIndex: "continent",
    filters: [
      {
        text: "Africa",
        value: "Africa"
      },
      {
        text: "Antarctica",
        value: "Antarctica"
      },
      {
        text: "Asia",
        value: "Asia"
      },
      {
        text: "Europe",
        value: "Europe"
      },
      {
        text: "North America",
        value: "North America"
      },
      {
        text: "Oceania",
        value: "Oceania"
      },
      {
        text: "South America",
        value: "South America"
      }
    ],
    onFilter: (value, record) => record.continent.indexOf(value) === 0,
    defaultSortOrder: "ascend",
    sorter: (a, b) => a.continent.localeCompare(b.continent)
  },
  {
    title: "Flag",
    dataIndex: "flag"
  }
];

export default function App(pagination, filters, sorter, extra) {
  const { data, loading, error } = useQuery(LIST_COUNTRIES, { client });

  if (loading || error) {
    return <div>{error ? error.message : <div className="async-spinner"></div>}</div>;
  }

  return (
    <Table
      columns={columns}
      dataSource={data.countries.map((country) => ({
        key: country.code,
        name: country.name,
        code: country.code,
        continent: country.continent.name,
        flag: (
          <ReactCountryFlag
            countryCode={country.code}
            svg
            cdnUrl="https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.4.3/flags/1x1/"
            cdnSuffix="svg"
            title={country.code}
          />
        )
      }))}
    />
  );
}
