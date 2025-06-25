# React 18→19, @react-three/fiber 8→9 アップグレードガイド

## 概要

React 18から19、@react-three/fiber 8から9へのアップグレードにより、JSX要素の登録方法が変更されました。このライブラリは新しい仕様に対応するため、以下の変更を行いました。

## 変更内容

### 1. extend()の呼び出し方法の変更

@react-three/fiber 9では、カスタムジオメトリを登録する際に、コンストラクタ関数を明示的に指定する必要があります。

```typescript
// 変更前 (fiber 8)
extend({ TextGeometry });

// 変更後 (fiber 9)
extend({ TextGeometry: TextGeometry });
```

### 2. JSX型定義の更新

React 19では、JSXの型定義の仕組みが変更されました。グローバルな型定義を追加することで、`textGeometry`要素をJSXで使用できるようになります。

## 使用方法

### 方法1: JSX要素として直接使用

```tsx
import { Canvas } from '@react-three/fiber';
import { TextGeometryComponent } from 'three-text-geometry';
import * as THREE from 'three';

function MyComponent() {
  const font = /* BMFont data */;
  const texture = /* THREE.Texture */;
  
  const textOption = {
    font: font,
    align: TextAlign.Left,
    width: 1600,
    flipY: texture.flipY,
  };

  return (
    <Canvas>
      <TextGeometryComponent 
        text="Hello World" 
        option={textOption}
        material={
          new THREE.MeshBasicMaterial({
            map: texture,
            side: THREE.DoubleSide,
            transparent: true,
            color: 0x666666,
          })
        }
      />
    </Canvas>
  );
}
```

### 方法2: 従来の方法（推奨）

JSX要素の登録に問題がある場合は、従来の方法でTextGeometryを使用することを推奨します：

```tsx
import { Canvas, useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import * as THREE from 'three';
import TextGeometry, { TextAlign } from 'three-text-geometry';

function TextMesh() {
  const meshRef = useRef<THREE.Mesh>(null);
  
  const font = /* BMFont data */;
  const texture = /* THREE.Texture */;
  
  const textOption = {
    font: font,
    align: TextAlign.Left,
    width: 1600,
    flipY: texture.flipY,
  };

  const geometry = new TextGeometry("Hello World", textOption);
  const material = new THREE.MeshBasicMaterial({
    map: texture,
    side: THREE.DoubleSide,
    transparent: true,
    color: 0x666666,
  });

  return <mesh ref={meshRef} geometry={geometry} material={material} />;
}

function MyComponent() {
  return (
    <Canvas>
      <TextMesh />
    </Canvas>
  );
}
```

## トラブルシューティング

### エラー: "Property 'textGeometry' does not exist on type 'JSX.IntrinsicElements'"

このエラーが発生する場合：

1. **ライブラリのインポートを確認**
   ```typescript
   import 'three-text-geometry'; // これにより型定義が読み込まれます
   ```

2. **tsconfig.jsonの設定を確認**
   ```json
   {
     "compilerOptions": {
       "jsx": "react-jsx",
       "types": ["react", "react-dom"]
     }
   }
   ```

3. **従来の方法を使用**
   JSX要素の登録に問題がある場合は、上記の方法2を使用してください。

## 注意事項

- React 19と@react-three/fiber 9の組み合わせは比較的新しいため、一部の機能で互換性の問題が発生する可能性があります。
- 問題が発生した場合は、従来の方法（方法2）を使用することを推奨します。
- ライブラリの更新を定期的にチェックし、最新の互換性情報を確認してください。 