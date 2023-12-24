import produce from 'immer'

const ManagerMajorTableState = {
    MajorList: [],
    MajorsToSelect: []
}

export const ManagerMajorTableReducer = produce(
    (s, a) => {
        switch (a.type) {
            case 'Fill-Major-Data':
                // eslint-disable-next-line no-lone-blocks
                {
                    s.MajorList = a.payload;
                    s.MajorsToSelect = a.payload.map(e => ({
                        majorName: e.majorName,
                        routeCoordinator: null,
                    }))
                }
                break;

            default:
                break;
        }
    },
    ManagerMajorTableState
)

export default ManagerMajorTableReducer