import type { SarahRead, SarahReadInput } from '../lib/engine/sarah-read';

/** §372 literal expected observations, copied from §7a; never computed by runtime. */
export const SARAH_GOLDEN_GRID: readonly { name: string; input: SarahReadInput; read: SarahRead }[] = [
  {
    "name": "U1",
    "input": {
      "declaredFee": {
        "amount": 1000,
        "currency": "USD",
        "dueDate": "2027-10-01"
      },
      "fixtureRateZmwPerUsd": 24.5,
      "asOf": "2026-09-09T00:00:00.000Z"
    },
    "read": {
      "engineVersion": "sarah-read-v1",
      "asOf": "2026-09-09T00:00:00.000Z",
      "declaredFee": {
        "amount": 1000,
        "currency": "USD",
        "dueDate": "2027-10-01",
        "source": "user-declared",
        "access": "read-only"
      },
      "localAmountZmwMinor": 2450000,
      "localDisplay": "K24,500",
      "rateBasis": {
        "kind": "example-rate",
        "zmwPerUsd": 24.5
      },
      "explanation": {
        "fee": "Course fee USD 1,000, due 1 Oct 2027, shows as K24,500 at this example rate.",
        "rateAssumption": "Example rate: ZMW 24.5 per US dollar. Not a live rate.",
        "limits": "Fictional course fee. This figure is not a payment quote. This read does not establish whether Sarah can pay the fee."
      }
    }
  },
  {
    "name": "U2",
    "input": {
      "declaredFee": {
        "amount": 1000,
        "currency": "USD",
        "dueDate": "2027-10-01"
      },
      "fixtureRateZmwPerUsd": 29.5,
      "asOf": "2026-09-25T00:00:00.000Z"
    },
    "read": {
      "engineVersion": "sarah-read-v1",
      "asOf": "2026-09-25T00:00:00.000Z",
      "declaredFee": {
        "amount": 1000,
        "currency": "USD",
        "dueDate": "2027-10-01",
        "source": "user-declared",
        "access": "read-only"
      },
      "localAmountZmwMinor": 2950000,
      "localDisplay": "K29,500",
      "rateBasis": {
        "kind": "example-rate",
        "zmwPerUsd": 29.5
      },
      "explanation": {
        "fee": "Course fee USD 1,000, due 1 Oct 2027, shows as K29,500 at this example rate.",
        "rateAssumption": "Example rate: ZMW 29.5 per US dollar. Not a live rate.",
        "limits": "Fictional course fee. This figure is not a payment quote. This read does not establish whether Sarah can pay the fee."
      }
    }
  },
  {
    "name": "U3",
    "input": {
      "declaredFee": {
        "amount": 1000,
        "currency": "USD",
        "dueDate": "2027-10-01"
      },
      "fixtureRateZmwPerUsd": 27,
      "asOf": "2026-10-09T00:00:00.000Z"
    },
    "read": {
      "engineVersion": "sarah-read-v1",
      "asOf": "2026-10-09T00:00:00.000Z",
      "declaredFee": {
        "amount": 1000,
        "currency": "USD",
        "dueDate": "2027-10-01",
        "source": "user-declared",
        "access": "read-only"
      },
      "localAmountZmwMinor": 2700000,
      "localDisplay": "K27,000",
      "rateBasis": {
        "kind": "example-rate",
        "zmwPerUsd": 27
      },
      "explanation": {
        "fee": "Course fee USD 1,000, due 1 Oct 2027, shows as K27,000 at this example rate.",
        "rateAssumption": "Example rate: ZMW 27 per US dollar. Not a live rate.",
        "limits": "Fictional course fee. This figure is not a payment quote. This read does not establish whether Sarah can pay the fee."
      }
    }
  },
  {
    "name": "Z1",
    "input": {
      "declaredFee": {
        "amount": 29500,
        "currency": "ZMW",
        "dueDate": "2027-10-01"
      },
      "fixtureRateZmwPerUsd": 24.5,
      "asOf": "2026-09-09T00:00:00.000Z"
    },
    "read": {
      "engineVersion": "sarah-read-v1",
      "asOf": "2026-09-09T00:00:00.000Z",
      "declaredFee": {
        "amount": 29500,
        "currency": "ZMW",
        "dueDate": "2027-10-01",
        "source": "user-declared",
        "access": "read-only"
      },
      "localAmountZmwMinor": 2950000,
      "localDisplay": "K29,500",
      "rateBasis": {
        "kind": "declared-zmw"
      },
      "explanation": {
        "fee": "Course fee K29,500, due 1 Oct 2027, is set in kwacha. The exchange rate does not change this declared amount.",
        "limits": "Fictional course fee. This figure is not a payment quote. This read does not establish whether Sarah can pay the fee."
      }
    }
  },
  {
    "name": "Z2",
    "input": {
      "declaredFee": {
        "amount": 29500,
        "currency": "ZMW",
        "dueDate": "2027-10-01"
      },
      "fixtureRateZmwPerUsd": 29.5,
      "asOf": "2026-09-25T00:00:00.000Z"
    },
    "read": {
      "engineVersion": "sarah-read-v1",
      "asOf": "2026-09-25T00:00:00.000Z",
      "declaredFee": {
        "amount": 29500,
        "currency": "ZMW",
        "dueDate": "2027-10-01",
        "source": "user-declared",
        "access": "read-only"
      },
      "localAmountZmwMinor": 2950000,
      "localDisplay": "K29,500",
      "rateBasis": {
        "kind": "declared-zmw"
      },
      "explanation": {
        "fee": "Course fee K29,500, due 1 Oct 2027, is set in kwacha. The exchange rate does not change this declared amount.",
        "limits": "Fictional course fee. This figure is not a payment quote. This read does not establish whether Sarah can pay the fee."
      }
    }
  },
  {
    "name": "Z3",
    "input": {
      "declaredFee": {
        "amount": 29500,
        "currency": "ZMW",
        "dueDate": "2027-10-01"
      },
      "fixtureRateZmwPerUsd": 27,
      "asOf": "2026-10-09T00:00:00.000Z"
    },
    "read": {
      "engineVersion": "sarah-read-v1",
      "asOf": "2026-10-09T00:00:00.000Z",
      "declaredFee": {
        "amount": 29500,
        "currency": "ZMW",
        "dueDate": "2027-10-01",
        "source": "user-declared",
        "access": "read-only"
      },
      "localAmountZmwMinor": 2950000,
      "localDisplay": "K29,500",
      "rateBasis": {
        "kind": "declared-zmw"
      },
      "explanation": {
        "fee": "Course fee K29,500, due 1 Oct 2027, is set in kwacha. The exchange rate does not change this declared amount.",
        "limits": "Fictional course fee. This figure is not a payment quote. This read does not establish whether Sarah can pay the fee."
      }
    }
  }
];
