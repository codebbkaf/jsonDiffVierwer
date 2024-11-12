import React, { useState } from "react";
import DiffViewer from "react-diff-viewer-continued";

// 定義五個 JSON 節點
const jsonVersions = [
  { id: 1, name: "版本 1", data: { name: "Alice", age: 25, city: "New York" } },
  { id: 2, name: "版本 2", data: { name: "Alice", age: 26, city: "New York", country: "USA" } },
  { id: 3, name: "版本 3", data: { name: "Alice", age: 27, city: "San Francisco", country: "USA" } },
  { id: 4, name: "版本 4", data: { name: "Bob", age: 27, city: "San Francisco", country: "USA" } },
  { id: 5, name: "版本 5", data: { name: "Bob", age: 27, city: "Los Angeles", country: "USA" } }
];

function JSONDiffViewer() {
  const [selectedJson1, setSelectedJson1] = useState(null);
  const [selectedJson2, setSelectedJson2] = useState(null);

  // JSON 轉為格式化文字
  const formatJson = (json) => JSON.stringify(json, null, 2);

  return (
    <div style={{ display: "flex", padding: "20px" }}>
      {/* 左側時間軸 */}
      <div style={{ width: "200px", paddingRight: "20px" }}>
        <h3>時間軸</h3>
        {jsonVersions.map((version) => (
          <div
            key={version.id}
            style={{
              padding: "10px",
              margin: "5px 0",
              cursor: "pointer",
              backgroundColor:
                selectedJson1?.id === version.id || selectedJson2?.id === version.id
                  ? "#ddd"
                  : "#f5f5f5",
              border: "1px solid #ccc",
              borderRadius: "5px"
            }}
            onClick={() => {
              // 切換選擇的版本
              if (!selectedJson1 || selectedJson2) {
                setSelectedJson1(version);
                setSelectedJson2(null);
              } else {
                setSelectedJson2(version);
              }
            }}
          >
            {version.name}
          </div>
        ))}
      </div>

      {/* 右側比對區域 */}
      <div style={{ flexGrow: 1 }}>
        <h3>JSON 差異</h3>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
          <div>
            <h4>選擇的 JSON 1</h4>
            {selectedJson1 ? (
              <pre>{formatJson(selectedJson1.data)}</pre>
            ) : (
              <p>尚未選擇 JSON</p>
            )}
          </div>
          <div>
            <h4>選擇的 JSON 2</h4>
            {selectedJson2 ? (
              <pre>{formatJson(selectedJson2.data)}</pre>
            ) : (
              <p>尚未選擇 JSON</p>
            )}
          </div>
        </div>
        {selectedJson1 && selectedJson2 ? (
          <DiffViewer
            oldValue={formatJson(selectedJson1.data)}
            newValue={formatJson(selectedJson2.data)}
            splitView={true}
            useDarkTheme={false}
          />
        ) : (
          <p>請選擇兩個版本以顯示差異。</p>
        )}
      </div>
    </div>
  );
}

export default JSONDiffViewer;