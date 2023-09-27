import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { TableProps } from '../../models';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableComponent<T extends { id: string | number }> {
  @Input({ required: true })
  tableProps: TableProps<T>[];

  @Input({ required: true })
  entities: T[];

  @Output()
  rowClick = new EventEmitter<T>();

  rowClickHanlder(entity: T): void {
    this.rowClick.emit(entity);
  }

  trackByUser(_: number, entity: T): number | string {
    return entity.id;
  }

  trackByTableProps(_: number, prop: TableProps<T>): string | number | symbol {
    return prop.key;
  }
}
