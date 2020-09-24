{
  "type": "object",
  "properties": {
    "review": {
      "type": "object",
      "properties": {
        "review_id": {
          "$ref": "#/definitions/positiveInt"
        },
        "product_id": {
          "$ref": "#/definitions/positiveInt"
        },
        "review_content": {
          "type": "string"
        },
        "review_title": {
          "type": "string"
        },
        "user_id": {
          "$ref": "#/definitions/positiveInt"
        },
        "review_date": {
          "type": "string",
          "chance": {
            "date": {
              "string": true
            }
          }
        },
        "quality_rating": {
          "type": "integer",
          "minimum": 1,
          "maximum": 5,
          "exclusiveMinimum": true
        },
        "value_rating": {
          "type": "integer",
          "minimum": 1,
          "maximum": 5,
          "exclusiveMinimum": true
        },
        "star_rating": {
          "type": "integer",
          "minimum": 1,
          "maximum": 5,
          "exclusiveMinimum": true
        },
        "helpful_yes": {
          "type": "integer",
          "minimum": 1,
          "maximum": 500,
          "exclusiveMinimum": true
        },
        "helpful_no": {
          "type": "integer",
          "minimum": 1,
          "maximum": 500,
          "exclusiveMinimum": true
        },
        "review_recommended": {
          "type": "boolean"
        },
        "frequency_of_use": {
          "type": "string"
        },
        "original_post_location": {
          "type": "string"
        }
      },
      "required": [
        "review_id",
        "product_id",
        "review_content",
        "review_title",
        "user_id",
        "review_date",
        "quality_rating",
        "value_rating",
        "frequency_of_use",
        "star_rating",
        "review_recommended",
        "helpful_yes",
        "helpful_no",
        "original_post_location"
      ]
    }
  },
  "definitions": {
    "positiveInt": {
      "type": "integer",
      "minimum": 0,
      "minimumExclusive": true
    }
  }
}


/*-----------------------------------------------------------------------------*/
// wihtout review: {}
{
  "type": "object",
  "properties": {
    "type": "object",
    "properties": {
      "review_id": {
        "$ref": "#/definitions/positiveInt"
      },
      "review_content": {
        "type": "string"
      },
      "review_title": {
        "type": "string"
      },
      "review_date": {
        "type": "string",
        "chance": {
          "date": {
            "string": true
          }
        }
      },
      "review_recommended": {
        "type": "boolean"
      },
      "product_id": {
        "$ref": "#/definitions/positiveInt"
      },
      "user_id": {
        "$ref": "#/definitions/positiveInt"
      },
      "quality_rating": {
        "type": "integer",
        "minimum": 1,
        "maximum": 5,
        "exclusiveMinimum": true
      },
      "value_rating": {
        "type": "integer",
        "minimum": 1,
        "maximum": 5,
        "exclusiveMinimum": true
      },
      "star_rating": {
        "type": "integer",
        "minimum": 1,
        "maximum": 5,
        "exclusiveMinimum": true
      },
      "helpful_yes": {
        "type": "integer",
        "minimum": 1,
        "maximum": 500,
        "exclusiveMinimum": true
      },
      "helpful_no": {
        "type": "integer",
        "minimum": 1,
        "maximum": 500,
        "exclusiveMinimum": true
      },
      "frequency_of_use": {
        "type": "string"
      },
      "original_post_location": {
        "type": "string"
      }
    },
    "required": [
      "review_id",
      "product_id",
      "review_content",
      "review_title",
      "user_id",
      "review_date",
      "quality_rating",
      "value_rating",
      "frequency_of_use",
      "star_rating",
      "review_recommended",
      "helpful_yes",
      "helpful_no",
      "original_post_location"
    ]
  },
  "definitions": {
    "positiveInt": {
      "type": "integer",
      "minimum": 0,
      "minimumExclusive": true
    }
  }
}