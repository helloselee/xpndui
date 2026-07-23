# 디자인 시스템 배포 결정

> 이 저장소의 본체는 **디자인 시스템**임. 랜딩(FORMWORK)·커머스(ATELIER)는 시스템 사용 예시(쇼케이스/문서)이지 산출물이 아님.

## 결정

- **외부 배포 확정 → B: 버전 관리되는 npm 패키지** (레지스트리 A 아님)
- 소비자가 `import` 해서 쓰고, semver로 통제된 업데이트를 받음

## 왜 B인가 (레지스트리 A를 안 쓰는 이유)

- 시스템을 **계속 키우고 중앙에서 관리**할 것 → 여러 소비자에게 지속적으로 업데이트를 밀어야 함
- 레지스트리(A)는 "소스 복사" 모델 → 두 가지가 치명적:
  - **업데이트 경로 없음** → 한 번 복사하면 끝. 개선/버그픽스를 소비자에 반영하려면 각자 `add --overwrite` 재실행 → 로컬 수정 유실
  - **drift 보장** → 복사 순간 각 앱이 fork → 시간이 지나면 앱마다 컴포넌트가 제각각 → "일관성"이라는 디자인 시스템의 목적과 정반대

> ✅ Insight: 앱 하나엔 "소스 소유·자유 수정"이 장점이지만, 중앙 관리·외부 배포 시스템에선 그게 drift 리스크가 된다. 성장하는 시스템은 소비자가 fork 못 하게 통제하고 싶어한다 → 그래서 B다.

## shadcn의 역할 (버리지 않음)

- shadcn = **저작 도구(재료 조달)**, 패키지 = **유통**
- 새 프리미티브 필요 시 `packages/ui`에 `shadcn add`로 긁어와 다듬은 뒤 패키지로 배포
- shadcn 대체가 아니라 "shadcn + 우리 델타"를 배포하는 것

## 배포물(시스템) vs 예제 경계

| 배포 대상 (packages/ui) | 예제 (apps/showcase, 배포 안 함) |
|---|---|
| `components/ui/*` (Base UI 프리미티브) | `ProductCard`, `CartButton`, `ShopFilters` |
| `lib/utils.ts` (cn) | `SiteHeader/Footer`, `ContentLayout`, `NewsletterForm` |
| 토큰 CSS (`--primary`, `--sale`, radius, 다크 값) | 페이지들(`/`, `/shop/*`), `lib/products.ts` |
| 커스텀 확장 (`sale` variant, `Swatch`, `IndicatorBadge`) | |
| Tailwind preset, 폰트 설정, 컨벤션 | |

## B 셋업 (pnpm workspace 모노레포)

- 구조: `packages/ui`(배포물) + `apps/showcase`(예제/문서). 예제는 `@xpnd/ui`를 `workspace:*`로 로컬 링크
- 외부 배포 → **`pnpm publish`** 로 npm 또는 사설 레지스트리에 semver 배포
- Tailwind v4 패키징:
  - 컴포넌트는 **TSX 소스**로 배포 + **Tailwind preset / 토큰 CSS** 동봉
  - 소비자는 우리 패키지를 스캔 대상에 추가 (`@source "../node_modules/@xpnd/ui"`), 토큰 CSS import
  - `@base-ui/react`는 **peerDependency**, `class-variance-authority`·`tailwind-merge`는 dependency

## B의 비용과 완화

- 비용: 소비자가 소스를 직접 못 고침
- 완화 → **확장 지점(extension points)** 을 잘 열어 fork 없이 확장 가능하게:
  - `cva` variant 계속 추가 (`sale`처럼)
  - `className` passthrough (`cn`으로 이미 됨)
  - compound components / slot 패턴
  - 정말 필요하면 해당 컴포넌트만 eject 가능

## 관련

- Base UI(base-nova) 컨벤션은 `AGENTS.md` 참조: `render` prop, 링크 렌더 시 `nativeButton={false}`, `data-[state]` 선택자, 선택 컨트롤 hover 부재, nullable 콜백, form 컴포넌트 부재
