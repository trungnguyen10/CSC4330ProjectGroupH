class FilterFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  filter() {
    let queryObj = { ...this.queryString };

    // delete inappropriate fields
    const excludedFields = ["page", "sort", "limit", "fields"];
    excludedFields.forEach((el) => delete queryObj[el]);

    // advanced filtering like gte, lte, gt, le
    // stringify, replace with correct MongoDB syntax
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(
      /\b(gte|gt|lte|lt|text|search)\b/g,
      (match) => `$${match}`
    );
    // convert back to object
    queryObj = JSON.parse(queryStr);

    this.query = this.query.find(queryObj);
    return this;
  }

  sort() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(",").join(" ");
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort("-createdAt");
    }
    return this;
  }

  pagenate() {
    const limit = Number(this.queryString.limit) || 20;
    const page = Number(this.queryString.page) || 1;
    const skip = limit * (page - 1);
    this.query = this.query.skip(skip).limit(limit);
    return this;
  }
}

module.exports = FilterFeatures;
