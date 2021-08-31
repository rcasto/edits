const NEIGHBOR_LABELS = {
    UPPER_LEFT: 'upperLeftNeighbor',
    UPPER: 'upperNeighbor',
    LEFT: 'leftNeighbor',
};
const EDIT_RECORD_TYPES = {
    MATCH: 'match',
    ADD: 'add',
    REPLACE: 'replace',
    DELETE: 'delete',
};

/**
 * Notes on implementation below are found at:
 * https://www.cs.jhu.edu/~langmea/resources/lecture_notes/dp_and_edit_dist.pdf
 * 
 * @param {string} str1 
 * @param {string} str2 
 */
function editDistance(str1, str2) {
    const str1Length = str1.length;
    const str2Length = str2.length;
    const editDistanceMatrix = [];

    // pre-initialize first column, while initializing all rows in matrix
    for (let i = 0; i <= str2Length; i++) {
        if (!editDistanceMatrix[i]) {
            editDistanceMatrix[i] = [];
        }
        editDistanceMatrix[i][0] = i;
    }

    // pre-initialize first row
    for (let i = 0; i <= str1Length; i++) {
        editDistanceMatrix[0][i] = i;
    }

    for (let i = 1; i <= str2Length; i++) {
        for (let j = 1; j <= str1Length; j++) {
            const delta = str1[j - 1] !== str2[i - 1]
                ? 1 : 0;
            const upperLeftNeighbor = editDistanceMatrix[i - 1][j - 1] || 0;
            const upperNeighbor = editDistanceMatrix[i - 1][j] || 0;
            const leftNeighbor = editDistanceMatrix[i][j - 1] || 0;
            editDistanceMatrix[i][j] = Math.min(
                upperLeftNeighbor + delta,
                upperNeighbor + 1,
                leftNeighbor + 1
            );
        }
    }

    const editRecords = getEditRecords(editDistanceMatrix, str1, str2);
    return {
        distance: editDistanceMatrix[str2Length][str1Length],
        records: editRecords,
    };
}

/*
    Edit record path, depicts the path to transform
    string 1 -> string 2
*/
function getEditRecords(editDistanceMatrix, str1, str2) {
    const editRecords = [];
    const numRows = (editDistanceMatrix || []).length;
    const numCols = editDistanceMatrix[0].length;

    let i = numRows - 1;
    let j = numCols - 1;

    while (i > 0 && j > 0) {
        const currentNeighbor = editDistanceMatrix[i][j];
        const upperLeftNeighbor = editDistanceMatrix[i - 1][j - 1] || 0;
        const upperNeighbor = editDistanceMatrix[i - 1][j] || 0;
        const leftNeighbor = editDistanceMatrix[i][j - 1] || 0;
        const neighbors = {
            [NEIGHBOR_LABELS.UPPER_LEFT]: upperLeftNeighbor,
            [NEIGHBOR_LABELS.UPPER]: upperNeighbor,
            [NEIGHBOR_LABELS.LEFT]: leftNeighbor,
        };
        let recordType;
        let minNeighborLabel;
        let minNeighborVal = Number.MAX_VALUE;

        Object.keys(neighbors)
            .forEach(neighborLabel => {
                if (neighbors[neighborLabel] < minNeighborVal) {
                    minNeighborVal = neighbors[neighborLabel];
                    minNeighborLabel = neighborLabel;
                }
            });

        const prevI = i;
        const prevJ = j;

        switch (minNeighborLabel) {
            case NEIGHBOR_LABELS.UPPER_LEFT:
                recordType = currentNeighbor === upperLeftNeighbor ?
                    EDIT_RECORD_TYPES.MATCH : EDIT_RECORD_TYPES.REPLACE;
                i = i - 1;
                j = j - 1;
                break;
            case NEIGHBOR_LABELS.UPPER:
                recordType = EDIT_RECORD_TYPES.ADD;
                i = i - 1;
                break;
            case NEIGHBOR_LABELS.LEFT:
                recordType = EDIT_RECORD_TYPES.DELETE;
                j = j - 1;
                break;
            default:
                throw new Error(`Invalid label ${minNeighborLabel}`);
        }

        editRecords.unshift(generateEditRecord(recordType, str1, str2, prevI, prevJ));
    }

    // 1 string is a subset of the other, remaining
    // additions or deletions
    if (i > 0 || j > 0) {
        // if string 1 is a subset of string 2
        // we add to string 1, otherwise delete
        const isString1LongerThanString2 = j > 0;
        const recordType = isString1LongerThanString2 ?
            EDIT_RECORD_TYPES.DELETE : EDIT_RECORD_TYPES.ADD;

        do {
            editRecords.unshift(generateEditRecord(recordType, str1, str2, i, j));

            if (isString1LongerThanString2) {
                j--;
            } else {
                i--;
            }
        } while (i > 0 || j > 0);
    }

    return editRecords;
}

function generateEditRecord(type, str1, str2, i, j) {
    // console.log(type, str1, str2, i, j);
    return {
        type,
        str1: {
            index: j - 1,
            value: str1[j - 1] || ''
        },
        str2: {
            index: i - 1,
            value: str2[i - 1] || ''
        },
    };
}