// Data Governance types
export interface DataMetric {
  label: string;
  value: number;
  change?: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
}

export interface DataQualityIssue {
  title: string;
  description: string;
  severity: 'high' | 'medium' | 'low';
}

export interface DataGovernanceMetric {
  name: string;
  value: number;
  color: string;
}

export interface ReferenceDataItem {
  id: string;
  name: string;
  description: string;
  count: number;
  status: 'active' | 'pending' | 'deprecated';
  lastUpdated: string;
}

export interface MasterDataEntity {
  id: string;
  type: string;
  name: string;
  status: 'active' | 'pending' | 'inactive';
  lastUpdated: string;
  qualityScore: number;
}

export interface DataModel {
  id: string;
  name: string;
  type: 'logical' | 'physical' | 'conceptual';
  entities: number;
  attributes: number;
  status: 'published' | 'draft' | 'review' | 'deprecated';
  version: string;
}

export interface DataType {
  id: string;
  name: string;
  category: 'string' | 'numeric' | 'date' | 'custom';
  format: string;
  usageCount: number;
  status: 'active' | 'pending' | 'deprecated';
  lastUpdated: string;
}
