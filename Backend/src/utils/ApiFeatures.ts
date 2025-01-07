import { Document, Query } from "mongoose";

class ApiFeatures {
  query: Query<any, Document>;
  queryStr: any;

  constructor(query: Query<any, Document>, queryStr: any) {
    this.query = query;
    this.queryStr = queryStr;
  }

  filter() {
    const excludeFields = ["sort", "page", "limit", "fields"];
    let queryObj = { ...this.queryStr };
    excludeFields.forEach((field) => {
      delete queryObj[field];
    });

    let queryString = JSON.stringify(queryObj);
    queryString = queryString.replace(
      /\b(gte|ge|lte|le)\b/g,
      (match) => `$${match}`
    );
    queryObj = JSON.parse(queryString);

    this.query = this.query.find(queryObj);
    return this;
  }

  sort() {
    if (this.queryStr.sort) {
      const sortBy: string = this.queryStr.sort.split(",").join(" ");
      this.query = this.query.sort(sortBy);
    } else {
      this.queryStr = this.queryStr.sort("-createdAt");
    }
    return this;
  }

  limitFields() {
    if (this.queryStr.fields) {
      const fields = this.queryStr.fields.split(",").join(" ");
      this.query = this.query.select(fields);
    } else {
      this.query = this.query.select("-__v");
    }
    return this;
  }

  paginate() {
    const page = parseInt(this.queryStr.page, 10) || 1;
    const limit = parseInt(this.queryStr.limit, 10) || 10;
    const skip = (page - 1) * limit;
    this.query = this.query.skip(skip).limit(limit);
    return this;
  }
}

export default ApiFeatures;
