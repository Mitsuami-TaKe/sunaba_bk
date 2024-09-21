module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',// テストファイルを見つけるためのグロブパターン
    // モジュール名のエイリアスを定義するための設定
    moduleNameMapper: {
        '^@src/(.*)$': '<rootDir>/src/$1', // '@src/'を'src/'にマッピング
    },
    // テストのカバレッジ情報を収集するための設定
    testMatch: ['**/test/**/?(*.)+(spec|test).ts?(x)'], 
    collectCoverage: true, // カバレッジを収集するかどうか
    collectCoverageFrom: ['src/**/*.{ts,tsx}'], // カバレッジを収集するファイルのパターン
    coverageDirectory: 'test/coverage',
    // カバレッジレポートの出力形式
    coverageReporters: ['text', 'lcov' , 'html'], // コンソール出力とlcov形式のレポート
  
    // テストを実行する際に使用する前処理のスクリプト
    //setupFilesAfterEnv: ['<rootDir>/setupTests.ts'], // テスト実行前に実行するスクリプト
  
    // どのようなスクリプトを使用するかを指定するための設定
    transform: {
      '^.+\\.ts$': ['ts-jest', {
        tsconfig: 'tsconfig.json', // tsconfig.json を使う
        diagnostics: true,         // コンパイルエラーや警告を表示する
      }],
    },

  };