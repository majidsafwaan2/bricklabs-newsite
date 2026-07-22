import type { GuideMaterial } from "@/content/guides/types";

export function MaterialsChecklist({ materials }: { materials: GuideMaterial[] }) {
  return (
    <div className="materials-checklist">
      {materials.map((material, index) => {
        const id = `material-${index + 1}`;
        return (
          <label key={`${material.quantity}-${material.item}`} htmlFor={id}>
            <input id={id} type="checkbox" />
            <span>
              <strong>{material.quantity} × {material.item}</strong>
              <small>{material.purpose}</small>
            </span>
          </label>
        );
      })}
    </div>
  );
}
