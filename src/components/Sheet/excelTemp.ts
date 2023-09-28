import type {
  ISheetData,
  ISheetKeyMaps,
  ISheetTemp,
  SheetName,
} from '@/interface';
import storage from '@/utils/storage';

type MockSheet = Record<
  keyof typeof SheetName,
  {
    sheetKeyMaps: ISheetKeyMaps[];
    sheetData: ISheetData[];
  }
>;

const mockSheet: MockSheet = {
  点位级数据对账表: {
    sheetKeyMaps: [
      { '设备国标（*）': 'camera_GB_id' },
      { 'CellAPI接收量（人脸）': 'cell.image_cell.face' },
      { 'CellAPI接收量（人体）': 'cell.image_cell.pedestrian' },
      { 'CellAPI接收量（机动车）': 'cell.image_cell.vehicle' },
      { 'CellAPI接收量（非机动车）': 'cell.image_cell.non_vehicle' },
      { 'Cell入库成功量（人脸）': 'cell.general.store_succ.face' },
      { 'Cell入库成功量（人体）': 'cell.general.store_succ.pedestrian' },
      { 'Cell入库成功量（机动车）': 'cell.general.store_succ.vehicle' },
      { 'Cell入库成功量（非机动车）': 'cell.general.store_succ.non_vehicle' },
      { 'L12入库成功量（人脸）': 'l12.store_succ.face' },
      { 'L12入库成功量（人体）': 'l12.store_succ.pedestrian' },
      { 'L12入库成功量（机动车）': 'l12.store_succ.vehicle' },
      { 'L12入库成功量（非机动车）': 'l12.store_succ.non_vehicle' },
      { 'L35聚档成功量（人脸）': 'l35.cluster_succ.face' },
      { 活跃档案数量: 'test_result.activate_dossier_counts' },
      { '临近轨迹占比（L1）': 'test_result.adjacent_track.L1' },
      { '临近轨迹占比（L5）': 'test_result.adjacent_track.L5' },
    ],
    sheetData: [
      {
        camera_GB_id: '33078458001311083096',
        cell: {
          image_cell: {
            face: 1,
            pedestrian: 2,
            vehicle: 3,
            non_vehicle: 4,
          },
          general: {
            store_succ: {
              face: 1,
              pedestrian: 2,
              vehicle: 3,
              non_vehicle: 4,
            },
          },
        },
        l12: {
          store_succ: {
            face: 1,
            pedestrian: 2,
            vehicle: 3,
            non_vehicle: 4,
          },
        },
        l35: {
          cluster_succ: {
            face: 1,
          },
        },
        test_result: {
          activate_dossier_counts: 1,
          adjacent_track: {
            L1: 2,
            L5: 3,
          },
        },
      },
    ],
  },
  点位建设信息表: {
    sheetKeyMaps: [
      {
        '基础信息.设备名称（*）': 'deviceName',
      },
      { '基础信息.设备国标（*）': 'deviceCode' },
      {
        '基础信息.行政区划（*）': 'division',
      },
      {
        '基础信息.摄像机类型': 'cameraType',
      },
      {
        '基础信息.镜头类型': 'lensType',
      },
      {
        '基础信息.高度类型': 'heightType',
      },
      {
        '基础信息.经度（*）': 'longitude',
      },
      {
        '基础信息.纬度（*）': 'latitude',
      },
      {
        '基础信息.摄像机功能类型（*）': 'cameraFunctionType',
      },
      {
        '基础信息.摄像机智能化类型（*）': 'cameraAnalysisType',
      },
      {
        '基础信息.建设状态（*）': 'constructionState',
      },
    ],
    sheetData: [
      {
        deviceName: '020681竹塘浸校塘振塘路创业路路口',
        deviceCode: '33078458001311083096',
        division: '44197450',
        cameraType: 3,
        lensType: 1,
        heightType: 2,
        longitude: 114.09123,
        latitude: 22.884012,
        cameraFunctionType: 5,
        cameraAnalysisType: 1,
        constructionState: 1,
      },
    ],
  },
  重点场所信息表: {
    sheetKeyMaps: [
      { '基础信息.重点场所名称（*）': 'keyPlaceName' },
      { '基础信息.重点场所类型（*）': 'keyPlaceType' },
      { '基础信息.行政区划（*）': 'division' },
      { '基础信息.经度（*）': 'longitude' },
      { '基础信息.纬度（*）': 'latitude' },
    ],
    sheetData: [
      {
        keyPlaceName: '重点场所名称',
        keyPlaceType: '旅馆业',
        division: '44197450',
        longitude: 114.09123,
        latitude: 22.884012,
      },
    ],
  },
  警情信息表: {
    sheetKeyMaps: [
      { '基础信息.警情名称（*）': 'policeSceneName' },
      { '基础信息.警情类型': 'policeSceneType' },
      { '基础信息.经度（*）': 'longitude' },
      { '基础信息.纬度（*）': 'latitude' },
      { '基础信息.开始时间（*）': 'startTime' },
      { '基础信息.结束时间（*）': 'endTime' },
    ],
    sheetData: [
      {
        policeSceneName: '警情名称',
        policeSceneType: '刑事',
        longitude: 114.09123,
        latitude: 22.884012,
        startTime: '2023/02/18 00:00:00',
        endTime: '2023/02/25 00:00:00',
      },
    ],
  },
  警格基础信息表: {
    sheetKeyMaps: [
      { '基础信息.警格名称（*）': 'policeGridName' },
      { '基础信息.边界经纬度（*）': 'lngLatBoundary' },
      { '基础信息.总人口（*）': 'population' },
      { '基础信息.面积（*平方公里）': 'area' },
      { '基础信息.建筑总量（*）': 'architectureTotal' },
    ],
    sheetData: [
      {
        policeGridName: '警格名称',
        lngLatBoundary:
          '[{"lng":113.829617,"lat":22.937958},{"lng":114.148925,"lat":22.818355},{"lng":114.071622,"lat":22.902583}]',
        population: 95,
        area: 100,
        architectureTotal: 40,
      },
    ],
  },
  警格结果表: {
    sheetKeyMaps: [
      { Code: 'id' },
      { 警格名称: 'policeGridName' },
      { '统计指标.人口总量': 'statistical.population' },
      { '统计指标.面积（平方公里）': 'statistical.area' },
      { '统计指标.摄像头总量': 'statistical.pointType1' },
      { '统计指标.重点场所总量': 'statistical.pointType2' },
      { '统计指标.警情总量': 'statistical.pointType3' },
      { '统计指标.视频流人像总量': 'statistical.cameraAnalysisType1' },
      { '统计指标.视频流治安总量': 'statistical.cameraAnalysisType2' },
      { '统计指标.图片流人脸总量': 'statistical.cameraAnalysisType3' },
      { '统计指标.图片流全结构化总量': 'statistical.cameraAnalysisType4' },
      { '统计指标.图片流车卡总量': 'statistical.cameraAnalysisType5' },
      { '预测指标.人脸抓拍数': 'predictive.faceSnapsNum' },
      { '预测指标.人体抓拍数': 'predictive.bodySnapsNum' },
      { '预测指标.连续轨迹比例': 'predictive.trajectoryRatio' },
      {
        '业务指标.人像总量的Cell人脸平均抓拍数':
          'BusinessIndex.cameraAnalysisType13CellReceiveFace',
      },
      {
        '业务指标.视频流人像的Cell人脸平均抓拍数':
          'BusinessIndex.cameraAnalysisType1CellReceiveFace',
      },
      {
        '业务指标.图片流人脸的Cell人脸平均抓拍数':
          'BusinessIndex.cameraAnalysisType3CellReceiveFace',
      },
      {
        '业务指标.视频流治安的Cell人体平均抓拍数':
          'BusinessIndex.cameraAnalysisType2CellReceivePedestrian',
      },
      {
        '业务指标.图片流全结构化的Cell人体平均抓拍数':
          'BusinessIndex.cameraAnalysisType4CellReceivePedestrian',
      },
      { '业务指标.L35聚档率': 'BusinessIndex.l35ClusterRate' },
      { '业务指标.活跃档案数量': 'BusinessIndex.activeDossierNum' },
      { '业务指标.临近轨迹占比（L1）': 'BusinessIndex.l1TimeSpaceRate' },
      { '业务指标.临近轨迹占比（L5）': 'BusinessIndex.l5TimeSpaceRate' },
    ],
    sheetData: [
      {
        statistical: {
          population: 253,
          area: 32.3223,
          pointType1: 123,
          pointType2: 23,
          pointType3: 42,
          cameraAnalysisType1: 23,
          cameraAnalysisType2: 32,
          cameraAnalysisType3: 15,
          cameraAnalysisType4: 42,
          cameraAnalysisType5: 12,
        },
        predictive: {
          faceSnapsNum: 300,
          bodySnapsNum: 20,
          trajectoryRatio: '10.3%',
        },
      },
    ],
  },
  网格结果表: {
    sheetKeyMaps: [
      { Code: 'id' },
      { '统计指标.面积（平方公里）': 'statistical.area' },
      { '统计指标.摄像头总量': 'statistical.pointType1' },
      { '统计指标.重点场所总量': 'statistical.pointType2' },
      { '统计指标.警情总量': 'statistical.pointType3' },
      { '统计指标.视频流人像总量': 'statistical.cameraAnalysisType1' },
      { '统计指标.视频流治安总量': 'statistical.cameraAnalysisType2' },
      { '统计指标.图片流人脸总量': 'statistical.cameraAnalysisType3' },
      { '统计指标.图片流全结构化总量': 'statistical.cameraAnalysisType4' },
      { '统计指标.图片流车卡总量': 'statistical.cameraAnalysisType5' },
      {
        '业务指标.人像总量的Cell人脸平均抓拍数':
          'BusinessIndex.cameraAnalysisType13CellReceiveFace',
      },
      {
        '业务指标.视频流人像的Cell人脸平均抓拍数':
          'BusinessIndex.cameraAnalysisType1CellReceiveFace',
      },
      {
        '业务指标.图片流人脸的Cell人脸平均抓拍数':
          'BusinessIndex.cameraAnalysisType3CellReceiveFace',
      },
      {
        '业务指标.视频流治安的Cell人体平均抓拍数':
          'BusinessIndex.cameraAnalysisType2CellReceivePedestrian',
      },
      {
        '业务指标.图片流全结构化的Cell人体平均抓拍数':
          'BusinessIndex.cameraAnalysisType4CellReceivePedestrian',
      },
      { '业务指标.L35聚档率': 'BusinessIndex.l35ClusterRate' },
      { '业务指标.活跃档案数量': 'BusinessIndex.activeDossierNum' },
      { '业务指标.临近轨迹占比（L1）': 'BusinessIndex.l1TimeSpaceRate' },
      { '业务指标.临近轨迹占比（L5）': 'BusinessIndex.l5TimeSpaceRate' },
    ],
    sheetData: [
      {
        statistical: {
          area: 42.2341,
          pointType1: 123,
          pointType2: 23,
          pointType3: 42,
          cameraAnalysisType1: 23,
          cameraAnalysisType2: 32,
          cameraAnalysisType3: 15,
          cameraAnalysisType4: 42,
          cameraAnalysisType5: 12,
        },
      },
    ],
  },
  区域人流阀值表: {
    sheetKeyMaps: [
      { 摄像机智能化类型: 'cameraAnalysisType' },
      { '区域人流量 高.日均人脸数': 'highFlow.face' },
      { '区域人流量 高.日均人体数': 'highFlow.body' },
      { '区域人流量 中.日均人脸数': 'middleFlow.face' },
      { '区域人流量 中.日均人体数': 'middleFlow.body' },
      { '区域人流量 低.日均人脸数': 'lowFlow.face' },
      { '区域人流量 低.日均人体数': 'lowFlow.body' },
    ],
    sheetData: [
      {
        cameraAnalysisType: '人脸抓拍机',
        highFlow: {
          face: 3000,
          body: 15000,
        },
        middleFlow: {
          face: 1000,
          body: 5000,
        },
        lowFlow: {
          face: 100,
          body: 500,
        },
      },
      {
        cameraAnalysisType: '结构化抓拍机',
        highFlow: {
          face: 3000,
          body: 15000,
        },
        middleFlow: {
          face: 1000,
          body: 5000,
        },
        lowFlow: {
          face: 100,
          body: 500,
        },
      },
      {
        cameraAnalysisType: '视频流（人脸可抓拍）',
        highFlow: {
          face: 3000,
          body: 15000,
        },
        middleFlow: {
          face: 1000,
          body: 5000,
        },
        lowFlow: {
          face: 100,
          body: 500,
        },
      },
      {
        cameraAnalysisType: '视频流（纯人体）',
        highFlow: {
          face: 3000,
          body: 15000,
        },
        middleFlow: {
          face: 1000,
          body: 5000,
        },
        lowFlow: {
          face: 100,
          body: 500,
        },
      },
    ],
  },
};

/**
 * 获取缓存的表格模版
 * @param sheetName
 * @param useCache
 */
export const getCacheSheet = (sheetName: keyof MockSheet, useCache = true) => {
  let sheetKeyMaps = mockSheet[sheetName].sheetKeyMaps;
  let sheetData = mockSheet[sheetName].sheetData;

  const cacheSheetKeyMaps = storage('localStorage').get(
    `${sheetName}-sheetKeyMaps`
  );
  const cacheSheetData = storage('localStorage').get(`${sheetName}-sheetData`);

  if (cacheSheetKeyMaps && useCache) {
    try {
      sheetKeyMaps = JSON.parse(cacheSheetKeyMaps);
    } catch (error) {
      console.error(error);
    }
  }
  if (cacheSheetData && useCache) {
    try {
      sheetData = JSON.parse(cacheSheetData);
    } catch (error) {
      console.error(error);
    }
  }

  return { sheetKeyMaps, sheetData };
};

/**
 * 点位建设信息表
 */
export const pointType1Sheet: ISheetTemp = {
  key: 'pointType1Sheet',
  sheetName: '点位建设信息表',
  sheetKeyMaps: getCacheSheet('点位建设信息表').sheetKeyMaps,
  sheetData: getCacheSheet('点位建设信息表').sheetData,
};

/**
 * 点位级数据对账表
 */
export const pointType1AccountSheet: ISheetTemp = {
  key: 'pointType1AccountSheet',
  sheetName: '点位级数据对账表',
  sheetKeyMaps: getCacheSheet('点位级数据对账表').sheetKeyMaps,
  sheetData: getCacheSheet('点位级数据对账表').sheetData,
};

/**
 * 重点场所信息表
 */
export const pointType2Sheet: ISheetTemp = {
  key: 'pointType2Sheet',
  sheetName: '重点场所信息表',
  sheetKeyMaps: getCacheSheet('重点场所信息表').sheetKeyMaps,
  sheetData: getCacheSheet('重点场所信息表').sheetData,
};

/**
 * 警情信息表
 */
export const pointType3Sheet: ISheetTemp = {
  key: 'pointType3Sheet',
  sheetName: '警情信息表',
  sheetKeyMaps: getCacheSheet('警情信息表').sheetKeyMaps,
  sheetData: getCacheSheet('警情信息表').sheetData,
};

/**
 * 警格基础信息表
 */
export const policeGridSheet: ISheetTemp = {
  key: 'policeGridSheet',
  sheetName: '警格基础信息表',
  sheetKeyMaps: getCacheSheet('警格基础信息表').sheetKeyMaps,
  sheetData: getCacheSheet('警格基础信息表').sheetData,
};

/**
 * 警格结果表
 */
export const policeCellResultSheet: ISheetTemp = {
  key: 'policeCellResultSheet',
  sheetName: '警格结果表',
  sheetKeyMaps: getCacheSheet('警格结果表').sheetKeyMaps,
  sheetData: getCacheSheet('警格结果表').sheetData,
};

/**
 * 网格结果表
 */
export const gridCellResultSheet: ISheetTemp = {
  key: 'gridCellResultSheet',
  sheetName: '网格结果表',
  sheetKeyMaps: getCacheSheet('网格结果表').sheetKeyMaps,
  sheetData: getCacheSheet('网格结果表').sheetData,
};

/**
 * 区域人流阀值表
 */
export const algorithmSheet: ISheetTemp = {
  key: 'algorithmSheet',
  sheetName: '区域人流阀值表',
  sheetKeyMaps: getCacheSheet('区域人流阀值表').sheetKeyMaps,
  sheetData: getCacheSheet('区域人流阀值表').sheetData,
};
