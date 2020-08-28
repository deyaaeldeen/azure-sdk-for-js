/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import * as coreHttp from "@azure/core-http";

export const MultiLanguageBatchInput: coreHttp.CompositeMapper = {
  type: {
    name: "Composite",
    className: "MultiLanguageBatchInput",
    modelProperties: {
      documents: {
        serializedName: "documents",
        required: true,
        type: {
          name: "Sequence",
          element: {
            type: { name: "Composite", className: "TextDocumentInput" }
          }
        }
      }
    }
  }
};

export const TextDocumentInput: coreHttp.CompositeMapper = {
  type: {
    name: "Composite",
    className: "TextDocumentInput",
    modelProperties: {
      id: {
        serializedName: "id",
        required: true,
        type: {
          name: "String"
        }
      },
      text: {
        serializedName: "text",
        required: true,
        type: {
          name: "String"
        }
      },
      language: {
        serializedName: "language",
        type: {
          name: "String"
        }
      }
    }
  }
};

export const EntitiesResult: coreHttp.CompositeMapper = {
  type: {
    name: "Composite",
    className: "EntitiesResult",
    modelProperties: {
      documents: {
        serializedName: "documents",
        required: true,
        type: {
          name: "Sequence",
          element: {
            type: { name: "Composite", className: "DocumentEntities" }
          }
        }
      },
      errors: {
        serializedName: "errors",
        required: true,
        type: {
          name: "Sequence",
          element: { type: { name: "Composite", className: "DocumentError" } }
        }
      },
      statistics: {
        serializedName: "statistics",
        type: {
          name: "Composite",
          className: "TextDocumentBatchStatistics"
        }
      },
      modelVersion: {
        serializedName: "modelVersion",
        required: true,
        type: {
          name: "String"
        }
      }
    }
  }
};

export const DocumentEntities: coreHttp.CompositeMapper = {
  type: {
    name: "Composite",
    className: "DocumentEntities",
    modelProperties: {
      id: {
        serializedName: "id",
        required: true,
        type: {
          name: "String"
        }
      },
      entities: {
        serializedName: "entities",
        required: true,
        type: {
          name: "Sequence",
          element: { type: { name: "Composite", className: "Entity" } }
        }
      },
      warnings: {
        serializedName: "warnings",
        required: true,
        type: {
          name: "Sequence",
          element: {
            type: { name: "Composite", className: "TextAnalyticsWarning" }
          }
        }
      },
      statistics: {
        serializedName: "statistics",
        type: {
          name: "Composite",
          className: "TextDocumentStatistics"
        }
      }
    }
  }
};

export const Entity: coreHttp.CompositeMapper = {
  type: {
    name: "Composite",
    className: "Entity",
    modelProperties: {
      text: {
        serializedName: "text",
        required: true,
        type: {
          name: "String"
        }
      },
      category: {
        serializedName: "category",
        required: true,
        type: {
          name: "String"
        }
      },
      subCategory: {
        serializedName: "subcategory",
        type: {
          name: "String"
        }
      },
      confidenceScore: {
        serializedName: "confidenceScore",
        required: true,
        type: {
          name: "Number"
        }
      }
    }
  }
};

export const TextAnalyticsWarning: coreHttp.CompositeMapper = {
  type: {
    name: "Composite",
    className: "TextAnalyticsWarning",
    modelProperties: {
      code: {
        serializedName: "code",
        required: true,
        type: {
          name: "String"
        }
      },
      message: {
        serializedName: "message",
        required: true,
        type: {
          name: "String"
        }
      }
    }
  }
};

export const TextDocumentStatistics: coreHttp.CompositeMapper = {
  type: {
    name: "Composite",
    className: "TextDocumentStatistics",
    modelProperties: {
      characterCount: {
        serializedName: "charactersCount",
        required: true,
        type: {
          name: "Number"
        }
      },
      transactionCount: {
        serializedName: "transactionsCount",
        required: true,
        type: {
          name: "Number"
        }
      }
    }
  }
};

export const DocumentError: coreHttp.CompositeMapper = {
  type: {
    name: "Composite",
    className: "DocumentError",
    modelProperties: {
      id: {
        serializedName: "id",
        required: true,
        type: {
          name: "String"
        }
      },
      error: {
        serializedName: "error",
        type: {
          name: "Composite",
          className: "TextAnalyticsError"
        }
      }
    }
  }
};

export const TextAnalyticsError: coreHttp.CompositeMapper = {
  type: {
    name: "Composite",
    className: "TextAnalyticsError",
    modelProperties: {
      code: {
        serializedName: "code",
        required: true,
        type: {
          name: "String"
        }
      },
      message: {
        serializedName: "message",
        required: true,
        type: {
          name: "String"
        }
      },
      target: {
        serializedName: "target",
        type: {
          name: "String"
        }
      },
      innerError: {
        serializedName: "innererror",
        type: {
          name: "Composite",
          className: "InnerError"
        }
      },
      details: {
        serializedName: "details",
        type: {
          name: "Sequence",
          element: {
            type: { name: "Composite", className: "TextAnalyticsError" }
          }
        }
      }
    }
  }
};

export const InnerError: coreHttp.CompositeMapper = {
  type: {
    name: "Composite",
    className: "InnerError",
    modelProperties: {
      code: {
        serializedName: "code",
        required: true,
        type: {
          name: "String"
        }
      },
      message: {
        serializedName: "message",
        required: true,
        type: {
          name: "String"
        }
      },
      details: {
        serializedName: "details",
        type: {
          name: "Dictionary",
          value: { type: { name: "String" } }
        }
      },
      target: {
        serializedName: "target",
        type: {
          name: "String"
        }
      },
      innerError: {
        serializedName: "innererror",
        type: {
          name: "Composite",
          className: "InnerError"
        }
      }
    }
  }
};

export const TextDocumentBatchStatistics: coreHttp.CompositeMapper = {
  type: {
    name: "Composite",
    className: "TextDocumentBatchStatistics",
    modelProperties: {
      documentCount: {
        serializedName: "documentsCount",
        required: true,
        type: {
          name: "Number"
        }
      },
      validDocumentCount: {
        serializedName: "validDocumentsCount",
        required: true,
        type: {
          name: "Number"
        }
      },
      erroneousDocumentCount: {
        serializedName: "erroneousDocumentsCount",
        required: true,
        type: {
          name: "Number"
        }
      },
      transactionCount: {
        serializedName: "transactionsCount",
        required: true,
        type: {
          name: "Number"
        }
      }
    }
  }
};

export const ErrorResponse: coreHttp.CompositeMapper = {
  type: {
    name: "Composite",
    className: "ErrorResponse",
    modelProperties: {
      error: {
        serializedName: "error",
        type: {
          name: "Composite",
          className: "TextAnalyticsError"
        }
      }
    }
  }
};

export const PiiEntitiesResult: coreHttp.CompositeMapper = {
  type: {
    name: "Composite",
    className: "PiiEntitiesResult",
    modelProperties: {
      documents: {
        serializedName: "documents",
        required: true,
        type: {
          name: "Sequence",
          element: {
            type: { name: "Composite", className: "PiiDocumentEntities" }
          }
        }
      },
      errors: {
        serializedName: "errors",
        required: true,
        type: {
          name: "Sequence",
          element: { type: { name: "Composite", className: "DocumentError" } }
        }
      },
      statistics: {
        serializedName: "statistics",
        type: {
          name: "Composite",
          className: "TextDocumentBatchStatistics"
        }
      },
      modelVersion: {
        serializedName: "modelVersion",
        required: true,
        type: {
          name: "String"
        }
      }
    }
  }
};

export const PiiDocumentEntities: coreHttp.CompositeMapper = {
  type: {
    name: "Composite",
    className: "PiiDocumentEntities",
    modelProperties: {
      id: {
        serializedName: "id",
        required: true,
        type: {
          name: "String"
        }
      },
      entities: {
        serializedName: "entities",
        required: true,
        type: {
          name: "Sequence",
          element: { type: { name: "Composite", className: "Entity" } }
        }
      },
      warnings: {
        serializedName: "warnings",
        required: true,
        type: {
          name: "Sequence",
          element: {
            type: { name: "Composite", className: "TextAnalyticsWarning" }
          }
        }
      },
      statistics: {
        serializedName: "statistics",
        type: {
          name: "Composite",
          className: "TextDocumentStatistics"
        }
      },
      redactedText: {
        serializedName: "redactedText",
        type: {
          name: "String"
        }
      }
    }
  }
};

export const EntityLinkingResult: coreHttp.CompositeMapper = {
  type: {
    name: "Composite",
    className: "EntityLinkingResult",
    modelProperties: {
      documents: {
        serializedName: "documents",
        required: true,
        type: {
          name: "Sequence",
          element: {
            type: { name: "Composite", className: "DocumentLinkedEntities" }
          }
        }
      },
      errors: {
        serializedName: "errors",
        required: true,
        type: {
          name: "Sequence",
          element: { type: { name: "Composite", className: "DocumentError" } }
        }
      },
      statistics: {
        serializedName: "statistics",
        type: {
          name: "Composite",
          className: "TextDocumentBatchStatistics"
        }
      },
      modelVersion: {
        serializedName: "modelVersion",
        required: true,
        type: {
          name: "String"
        }
      }
    }
  }
};

export const DocumentLinkedEntities: coreHttp.CompositeMapper = {
  type: {
    name: "Composite",
    className: "DocumentLinkedEntities",
    modelProperties: {
      id: {
        serializedName: "id",
        required: true,
        type: {
          name: "String"
        }
      },
      entities: {
        serializedName: "entities",
        required: true,
        type: {
          name: "Sequence",
          element: { type: { name: "Composite", className: "LinkedEntity" } }
        }
      },
      warnings: {
        serializedName: "warnings",
        required: true,
        type: {
          name: "Sequence",
          element: {
            type: { name: "Composite", className: "TextAnalyticsWarning" }
          }
        }
      },
      statistics: {
        serializedName: "statistics",
        type: {
          name: "Composite",
          className: "TextDocumentStatistics"
        }
      }
    }
  }
};

export const LinkedEntity: coreHttp.CompositeMapper = {
  type: {
    name: "Composite",
    className: "LinkedEntity",
    modelProperties: {
      name: {
        serializedName: "name",
        required: true,
        type: {
          name: "String"
        }
      },
      matches: {
        serializedName: "matches",
        required: true,
        type: {
          name: "Sequence",
          element: { type: { name: "Composite", className: "Match" } }
        }
      },
      language: {
        serializedName: "language",
        required: true,
        type: {
          name: "String"
        }
      },
      dataSourceEntityId: {
        serializedName: "id",
        type: {
          name: "String"
        }
      },
      url: {
        serializedName: "url",
        required: true,
        type: {
          name: "String"
        }
      },
      dataSource: {
        serializedName: "dataSource",
        required: true,
        type: {
          name: "String"
        }
      },
      bingId: {
        serializedName: "bingId",
        type: {
          name: "String"
        }
      }
    }
  }
};

export const Match: coreHttp.CompositeMapper = {
  type: {
    name: "Composite",
    className: "Match",
    modelProperties: {
      confidenceScore: {
        serializedName: "confidenceScore",
        required: true,
        type: {
          name: "Number"
        }
      },
      text: {
        serializedName: "text",
        required: true,
        type: {
          name: "String"
        }
      }
    }
  }
};

export const KeyPhraseResult: coreHttp.CompositeMapper = {
  type: {
    name: "Composite",
    className: "KeyPhraseResult",
    modelProperties: {
      documents: {
        serializedName: "documents",
        required: true,
        type: {
          name: "Sequence",
          element: {
            type: { name: "Composite", className: "DocumentKeyPhrases" }
          }
        }
      },
      errors: {
        serializedName: "errors",
        required: true,
        type: {
          name: "Sequence",
          element: { type: { name: "Composite", className: "DocumentError" } }
        }
      },
      statistics: {
        serializedName: "statistics",
        type: {
          name: "Composite",
          className: "TextDocumentBatchStatistics"
        }
      },
      modelVersion: {
        serializedName: "modelVersion",
        required: true,
        type: {
          name: "String"
        }
      }
    }
  }
};

export const DocumentKeyPhrases: coreHttp.CompositeMapper = {
  type: {
    name: "Composite",
    className: "DocumentKeyPhrases",
    modelProperties: {
      id: {
        serializedName: "id",
        required: true,
        type: {
          name: "String"
        }
      },
      keyPhrases: {
        serializedName: "keyPhrases",
        required: true,
        type: {
          name: "Sequence",
          element: { type: { name: "String" } }
        }
      },
      warnings: {
        serializedName: "warnings",
        required: true,
        type: {
          name: "Sequence",
          element: {
            type: { name: "Composite", className: "TextAnalyticsWarning" }
          }
        }
      },
      statistics: {
        serializedName: "statistics",
        type: {
          name: "Composite",
          className: "TextDocumentStatistics"
        }
      }
    }
  }
};

export const LanguageBatchInput: coreHttp.CompositeMapper = {
  type: {
    name: "Composite",
    className: "LanguageBatchInput",
    modelProperties: {
      documents: {
        serializedName: "documents",
        required: true,
        type: {
          name: "Sequence",
          element: {
            type: { name: "Composite", className: "DetectLanguageInput" }
          }
        }
      }
    }
  }
};

export const DetectLanguageInput: coreHttp.CompositeMapper = {
  type: {
    name: "Composite",
    className: "DetectLanguageInput",
    modelProperties: {
      id: {
        serializedName: "id",
        required: true,
        type: {
          name: "String"
        }
      },
      text: {
        serializedName: "text",
        required: true,
        type: {
          name: "String"
        }
      },
      countryHint: {
        serializedName: "countryHint",
        type: {
          name: "String"
        }
      }
    }
  }
};

export const LanguageResult: coreHttp.CompositeMapper = {
  type: {
    name: "Composite",
    className: "LanguageResult",
    modelProperties: {
      documents: {
        serializedName: "documents",
        required: true,
        type: {
          name: "Sequence",
          element: {
            type: { name: "Composite", className: "DocumentLanguage" }
          }
        }
      },
      errors: {
        serializedName: "errors",
        required: true,
        type: {
          name: "Sequence",
          element: { type: { name: "Composite", className: "DocumentError" } }
        }
      },
      statistics: {
        serializedName: "statistics",
        type: {
          name: "Composite",
          className: "TextDocumentBatchStatistics"
        }
      },
      modelVersion: {
        serializedName: "modelVersion",
        required: true,
        type: {
          name: "String"
        }
      }
    }
  }
};

export const DocumentLanguage: coreHttp.CompositeMapper = {
  type: {
    name: "Composite",
    className: "DocumentLanguage",
    modelProperties: {
      id: {
        serializedName: "id",
        required: true,
        type: {
          name: "String"
        }
      },
      detectedLanguage: {
        serializedName: "detectedLanguage",
        type: {
          name: "Composite",
          className: "DetectedLanguage"
        }
      },
      warnings: {
        serializedName: "warnings",
        required: true,
        type: {
          name: "Sequence",
          element: {
            type: { name: "Composite", className: "TextAnalyticsWarning" }
          }
        }
      },
      statistics: {
        serializedName: "statistics",
        type: {
          name: "Composite",
          className: "TextDocumentStatistics"
        }
      }
    }
  }
};

export const DetectedLanguage: coreHttp.CompositeMapper = {
  type: {
    name: "Composite",
    className: "DetectedLanguage",
    modelProperties: {
      name: {
        serializedName: "name",
        required: true,
        type: {
          name: "String"
        }
      },
      iso6391Name: {
        serializedName: "iso6391Name",
        required: true,
        type: {
          name: "String"
        }
      },
      confidenceScore: {
        serializedName: "confidenceScore",
        required: true,
        type: {
          name: "Number"
        }
      }
    }
  }
};

export const SentimentResponse: coreHttp.CompositeMapper = {
  type: {
    name: "Composite",
    className: "SentimentResponse",
    modelProperties: {
      documents: {
        serializedName: "documents",
        required: true,
        type: {
          name: "Sequence",
          element: {
            type: { name: "Composite", className: "DocumentSentiment" }
          }
        }
      },
      errors: {
        serializedName: "errors",
        required: true,
        type: {
          name: "Sequence",
          element: { type: { name: "Composite", className: "DocumentError" } }
        }
      },
      statistics: {
        serializedName: "statistics",
        type: {
          name: "Composite",
          className: "TextDocumentBatchStatistics"
        }
      },
      modelVersion: {
        serializedName: "modelVersion",
        required: true,
        type: {
          name: "String"
        }
      }
    }
  }
};

export const DocumentSentiment: coreHttp.CompositeMapper = {
  type: {
    name: "Composite",
    className: "DocumentSentiment",
    modelProperties: {
      id: {
        serializedName: "id",
        required: true,
        type: {
          name: "String"
        }
      },
      sentiment: {
        serializedName: "sentiment",
        required: true,
        type: {
          name: "Enum",
          allowedValues: ["positive", "neutral", "negative", "mixed"]
        }
      },
      statistics: {
        serializedName: "statistics",
        type: {
          name: "Composite",
          className: "TextDocumentStatistics"
        }
      },
      confidenceScores: {
        serializedName: "confidenceScores",
        type: {
          name: "Composite",
          className: "SentimentConfidenceScores"
        }
      },
      sentenceSentiments: {
        serializedName: "sentences",
        required: true,
        type: {
          name: "Sequence",
          element: {
            type: { name: "Composite", className: "SentenceSentiment" }
          }
        }
      },
      warnings: {
        serializedName: "warnings",
        required: true,
        type: {
          name: "Sequence",
          element: {
            type: { name: "Composite", className: "TextAnalyticsWarning" }
          }
        }
      }
    }
  }
};

export const SentimentConfidenceScores: coreHttp.CompositeMapper = {
  type: {
    name: "Composite",
    className: "SentimentConfidenceScores",
    modelProperties: {
      positive: {
        serializedName: "positive",
        required: true,
        type: {
          name: "Number"
        }
      },
      neutral: {
        serializedName: "neutral",
        required: true,
        type: {
          name: "Number"
        }
      },
      negative: {
        serializedName: "negative",
        required: true,
        type: {
          name: "Number"
        }
      }
    }
  }
};

export const SentenceSentiment: coreHttp.CompositeMapper = {
  type: {
    name: "Composite",
    className: "SentenceSentiment",
    modelProperties: {
      text: {
        serializedName: "text",
        required: true,
        type: {
          name: "String"
        }
      },
      sentiment: {
        serializedName: "sentiment",
        required: true,
        type: {
          name: "Enum",
          allowedValues: ["positive", "neutral", "negative"]
        }
      },
      confidenceScores: {
        serializedName: "confidenceScores",
        type: {
          name: "Composite",
          className: "SentimentConfidenceScores"
        }
      },
      aspects: {
        serializedName: "aspects",
        type: {
          name: "Sequence",
          element: { type: { name: "Composite", className: "SentenceAspect" } }
        }
      },
      opinions: {
        serializedName: "opinions",
        type: {
          name: "Sequence",
          element: { type: { name: "Composite", className: "SentenceOpinion" } }
        }
      }
    }
  }
};

export const SentenceAspect: coreHttp.CompositeMapper = {
  type: {
    name: "Composite",
    className: "SentenceAspect",
    modelProperties: {
      sentiment: {
        serializedName: "sentiment",
        required: true,
        type: {
          name: "Enum",
          allowedValues: ["positive", "mixed", "negative"]
        }
      },
      confidenceScores: {
        serializedName: "confidenceScores",
        type: {
          name: "Composite",
          className: "AspectConfidenceScoreLabel"
        }
      },
      text: {
        serializedName: "text",
        required: true,
        type: {
          name: "String"
        }
      },
      relations: {
        serializedName: "relations",
        required: true,
        type: {
          name: "Sequence",
          element: { type: { name: "Composite", className: "AspectRelation" } }
        }
      }
    }
  }
};

export const AspectConfidenceScoreLabel: coreHttp.CompositeMapper = {
  type: {
    name: "Composite",
    className: "AspectConfidenceScoreLabel",
    modelProperties: {
      positive: {
        serializedName: "positive",
        required: true,
        type: {
          name: "Number"
        }
      },
      negative: {
        serializedName: "negative",
        required: true,
        type: {
          name: "Number"
        }
      }
    }
  }
};

export const AspectRelation: coreHttp.CompositeMapper = {
  type: {
    name: "Composite",
    className: "AspectRelation",
    modelProperties: {
      relationType: {
        serializedName: "relationType",
        required: true,
        type: {
          name: "Enum",
          allowedValues: ["opinion", "aspect"]
        }
      },
      ref: {
        serializedName: "ref",
        required: true,
        type: {
          name: "String"
        }
      }
    }
  }
};

export const SentenceOpinion: coreHttp.CompositeMapper = {
  type: {
    name: "Composite",
    className: "SentenceOpinion",
    modelProperties: {
      sentiment: {
        serializedName: "sentiment",
        required: true,
        type: {
          name: "Enum",
          allowedValues: ["positive", "mixed", "negative"]
        }
      },
      confidenceScores: {
        serializedName: "confidenceScores",
        type: {
          name: "Composite",
          className: "AspectConfidenceScoreLabel"
        }
      },
      text: {
        serializedName: "text",
        required: true,
        type: {
          name: "String"
        }
      },
      isNegated: {
        serializedName: "isNegated",
        required: true,
        type: {
          name: "Boolean"
        }
      }
    }
  }
};
