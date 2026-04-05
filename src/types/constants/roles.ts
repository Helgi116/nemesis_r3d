export const ROLES = [
  { value: 'rockerboy', label: 'Рокербой', role_ability: 'charismatic_impact', role_ability_label: 'Харизматическое влияние', role_description: 'Бунтари рок‑н‑ролла, бросающие вызов власти с помощью искусства, выступлений и пламенной риторики.'},
  { value: 'solo', label: 'Соло', role_ability: 'combat_awereness', role_ability_label: 'Боевое чутьё', role_description: 'Наёмные убийцы, телохранители, ликвидаторы и солдаты удачи в новом беззаконном мире.'},
  { value: 'netrunner', label: 'Нетраннер', role_ability: 'interface', role_ability_label: 'Интерфейс', role_description: 'Кибернетические виртуозы взлома в мире пост‑сети — похитители тайн, способных сжечь мозг.'},
  { value: 'tech', label: 'Техник', role_ability: 'maker', role_ability_label: 'Создатель', role_description: 'Мятежные механики и изобретатели сверхтехнологий — те, кто заставляет работать Тёмное Будущее.'},
  { value: 'medtech', label: 'Медтехник', role_ability: 'medicine', role_ability_label: 'Медицина', role_description: 'Нелицензированные уличные врачи и кибермедики, штопающие плоть и металл.'},
  { value: 'media', label: 'Медиа', role_ability: 'credibility', role_ability_label: 'Авторитетность', role_description: 'Репортёры, звёзды медиа и инфлюэнсеры, рискующие всем — ради правды… или славы.'},
  { value: 'exec', label: 'Менеджер', role_ability: 'teamwork', role_ability_label: 'Командная работа', role_description: 'Корпоративные воротилы и бизнес-рейдеры, сражающиеся за восстановление власти Мегакорпораций.'},
  { value: 'lawman', label: 'Законник', role_ability: 'backup', role_ability_label: 'Подкрепление', role_description: 'Неумолимые блюстители закона, патрулирующие жестокие улицы и дикие магистрали за городской чертой.'},
  { value: 'fixer', label: 'Фиксер', role_ability: 'operator', role_ability_label: 'Деловая хватка', role_description: 'Дилеры, организаторы и торговцы информацией на поствоенных Полуночных Рынках Улицы.'},
  { value: 'nomad', label: 'Кочевник', role_ability: 'moto', role_ability_label: 'Мотор', role_description: 'Эксперты по перевозкам, бесстрашные воины дорог, пираты и контрабандисты, которые держат мир связанным воедино.'}
] as const;

export type Role = typeof ROLES[number]['value'];