import * as r from './result';
import moment from 'moment'

/**
 * 文字列のチェック
 * @param item チェック対象
 * @param isEmpty 空文字okならtrue
 * @param isNull null/undefinedがokならtrue
 */
export function isString(item: string, isEmpty: boolean, isNull: boolean): r.Result<string, string> {
    if (item == null) {
        if (isNull) {
            return new r.Success('');
        }
        return new r.Failure(`item is null/undefined`);
    }
    if (typeof item !== 'string') {
        return new r.Failure(`${item}'s type is not string`)
    }
    //空文字チェック
    if (item.trim() === '') {
        if (isEmpty) {
            return new r.Success('');
        }
        return new r.Failure(`item is empty`);
    }
    return new r.Success(item.trim())
}

/**
 * 数値データのチェック
 * @param item チェック対象
 * @param isNull null/undefinedがokならtrue
 */
export function isNumber(item: number, isNull: boolean): r.Result<number, string> {
    //null・undefinedチェック
    if (item == null) {
        if (isNull) {
            return new r.Success(0);
        }
        return new r.Failure(`item is null/undefined`);
    }
    //型チェック 
    if (isNaN(item)) {
        return new r.Failure(`${item}'s type is not number`);
    }
    return new r.Success(item);
}
/**
 * フラグ用数値データのチェック
 * @param item チェック対象
 * @param isNull null/undefinedがokならtrue
 * @param maxCount flagの最大値
 */
export function isFlagNumber(item: number, isNull: boolean, maxCount: number): r.Result<number, string> {
    //null・undefinedチェック
    if (item == null) {
        if (isNull) {
            return new r.Success(0);
        }
        return new r.Failure(`item is null/undefined`);
    }
    //型チェック 
    if (isNaN(item)) {
        return new r.Failure(`${item}'s type is not number`);
    }
    //チェック 
    if (maxCount < item) {
        return new r.Failure(`${item} is over maxCount{${maxCount}}`);
    }
    return new r.Success(item);
}
/**
 * string型の数字データのチェック
 * @param item チェック対象
 * @param isEmpty 空文字okならtrue
 * @param isNull null/undefinedがokならtrue
 */
export function isStringNumber(item: string, isEmpty: boolean, isNull: boolean): r.Result<number, string> {
    //null・undefinedチェック
    if (item == null) {
        if (isNull) {
            return new r.Success('0');
        }
        return new r.Failure(`item is null/undefined`);
    }
    //型チェック 
    if (typeof item !== 'string') {
        return new r.Failure(`${item}'s type is not string`)
    };
    //空文字チェック
    if (item.trim() === '') {
        if (isEmpty) {
            return new r.Success('0');
        }
        return new r.Failure(`item is empty`);
    };
    //データが数字の風体をしてるかのチェック
    if (isNaN(Number(item))) {
        return new r.Failure(`${item} is not StringNumber`);
    }
    return new r.Success(item)
}
/**
 * Date型のチェック タイムゾーンはUTCで返す
 * @param item チェック対象
 * @param isEmpty 空文字okならtrue
 * @param isNull null/undefinedがokならtrue
 */
export function isDate(item: string, isEmpty: boolean, isNull: boolean): r.Result<Date, string> {
    //null・undefinedチェック
    if (item == null) {
        if (isNull) {
            return new r.Success(moment().utc().startOf('day').toDate());
        }
        return new r.Failure(`item is null/undefined`);
    }
    //型チェック 
    if (typeof item !== 'string') {
        return new r.Failure(`${item}'s type is not string`)
    };
    //空文字チェック
    if (item.trim() === '') {
        if (isEmpty) {
            return new r.Success(moment().utc().startOf('day').toDate());
        }
        return new r.Failure(`item is empty`);
    };
    //データが日付の風体をしてるかのチェック
    if (!moment(`${item}T00:00:00.000Z`).isValid()) {
        return new r.Failure(`${item} is not Date`);
    };
    return new r.Success(moment(`${item}T00:00:00.000Z`).toDate());
}
/*
* 時間も含むDate型のチェック　UTCで返す
* @param item チェック対象
* @param isEmpty 空文字okならtrue
* @param isNull null/undefinedがokならtrue
*/
export function isDateTime(item: string, isEmpty: boolean, isNull: boolean): r.Result<Date, string> {
    //null・undefinedチェック
    if (item == null) {
        if (isNull) {
            return new r.Success(moment().utc().toDate());
        }
        return new r.Failure(`item is null/undefined`);
    }
    //型チェック 
    if (typeof item !== 'string') {
        return new r.Failure(`${item}'s type is not string`)
    };
    //空文字チェック
    if (item.trim() === '') {
        if (isEmpty) {
            return new r.Success(moment().utc().toDate());
        }
        return new r.Failure(`item is empty`);
    };
    //データが日付の風体をしてるかのチェック
    if (!moment(item, "YYYY-MM-DD hh:mm:ss").isValid()) {
        return new r.Failure(`${item} is not DateTime`);
    };
    return new r.Success(moment(item).utc().toDate());
}